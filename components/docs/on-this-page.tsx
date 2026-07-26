"use client";

import { useEffect, useState } from "react";
import GithubSlugger from "github-slugger";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform
} from "motion/react";
import { cn } from "@/lib/utils";

import { TOCItemType, TOCMinimap } from "@/components/docs/toc-minimap";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

type Heading = {
  id: string;
  text: string;
  level: number;
};

type Props = {
  docsRef: React.RefObject<HTMLDivElement | null>;
};

export function OnThisPage({ docsRef }: Props) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const [items, setItems] = useState<TOCItemType[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const { scrollYProgress } = useScroll({
    target: docsRef,
    offset: ["start start", "end end"]
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20
  });

  const radius = 18;
  const circumference = 2 * Math.PI * radius;

  const dashOffset = useTransform(progress, value => {
    return circumference * (1 - value);
  });

  useEffect(() => {
    const container = document.getElementById("docs-content");
    if (!container) return;

    const slugger = new GithubSlugger();

    const elements = Array.from(
      container.querySelectorAll("h2, h3")
    ) as HTMLHeadingElement[];

    const list: Heading[] = elements
      .map(el => {
        const text = el.textContent?.trim() ?? "";
        if (!text) return null;

        const id = el.id || slugger.slug(text);
        el.id = id;

        return {
          id,
          text,
          level: Number(el.tagName[1])
        };
      })
      .filter(Boolean) as Heading[];

    const items = list.map(item => ({
      title: item.text,
      url: `#${item.id}`,
      depth: item.level
    }));

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(items);
    setHeadings(list);
  }, []);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-96px 0px -60% 0px",
        threshold: 0
      }
    );

    headings.forEach(h => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <>
      <motion.nav
        initial={{
          opacity: 0,
          y: 30,
          scale: 0.95,
          borderRadius: 50
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          borderRadius: open ? 16 : 50
        }}
        transition={{
          duration: 0.35,
          ease: "easeOut"
        }}
        className="not-typeset fixed bottom-12 left-1/2 z-40 w-[320px] max-w-[calc(100vw-2rem)] -translate-x-1/2 overflow-hidden border border-neutral-200/50 bg-neutral-100/80 backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-900/80">
        <div className="relative flex h-full w-full flex-col px-1.5 py-3">
          <button
            onClick={() => setOpen(o => !o)}
            className="text-muted-primary hover:text-primary mb-1 flex w-full cursor-pointer items-center gap-4 px-2 transition-colors duration-300">
            <div className="flex items-center gap-2">
              <div className="relative">
                <svg
                  className="-rotate-90"
                  width="28"
                  height="28"
                  viewBox="0 0 44 44">
                  <circle
                    cx="22"
                    cy="22"
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="text-neutral-300 dark:text-neutral-700"
                  />

                  <motion.circle
                    cx="22"
                    cy="22"
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="text-primary"
                    strokeDasharray={circumference}
                    style={{
                      strokeDashoffset: dashOffset
                    }}
                  />
                </svg>
              </div>

              <motion.span
                key={activeId}
                initial={{
                  opacity: 0,
                  y: 6,
                  x: 0,
                  origin: "top left",
                  filter: "blur(10px)"
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  x: 0,
                  origin: "top left",
                  filter: "blur(0px)"
                }}
                exit={{
                  opacity: 0,
                  y: -6,
                  x: 0,
                  origin: "top left",
                  filter: "blur(10px)"
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut"
                }}
                className="text-foreground max-w-60 truncate text-base font-medium">
                {headings.find(h => h.id === activeId)?.text ??
                  headings[0]?.text}
              </motion.span>
            </div>
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  duration: 0.25,
                  ease: "easeInOut"
                }}
                className="w-full max-w-120 overflow-hidden">
                <ScrollArea scrollbarGutter className={"scroll-fade h-100"}>
                  <motion.ul
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.04
                        }
                      }
                    }}
                    className="mt-2 space-y-1 pl-2 text-sm">
                    {headings.map(h => (
                      <motion.li
                        key={h.id}
                        variants={{
                          hidden: {
                            opacity: 0,
                            x: -10
                          },
                          visible: {
                            opacity: 1,
                            x: 0
                          }
                        }}
                        className="line-clamp-2 list-none"
                        style={{
                          paddingLeft: `${(h.level - 2) * 16}px`
                        }}>
                        <Link
                          href={`#${h.id}`}
                          className={cn(
                            "block rounded-lg px-3 py-2 transition-all duration-200",
                            activeId === h.id
                              ? "bg-secondary text-foreground"
                              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                          )}>
                          {h.text}
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                </ScrollArea>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      <TOCMinimap
        items={items}
        className="fixed top-1/2 right-4 z-40 hidden -translate-y-1/2"
      />
    </>
  );
}
