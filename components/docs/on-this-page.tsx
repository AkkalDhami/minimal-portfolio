"use client";

import { useEffect, useState } from "react";
import GithubSlugger from "github-slugger";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

import { TOCItemType, TOCMinimap } from "@/components/docs/toc-minimap";
import { ScrollArea } from "@/components/ui/scroll-area";

type Heading = {
  id: string;
  text: string;
  level: number;
};

export function OnThisPage() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const [items, setItems] = useState<TOCItemType[]>([]);
  const [open, setOpen] = useState<boolean>(false);

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
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.35,
          ease: "easeOut"
        }}
        className="fixed bottom-6 left-1/2 z-40 w-[320px] max-w-[calc(100vw-2rem)] -translate-x-1/2 overflow-hidden rounded-2xl border border-neutral-200/50 bg-neutral-100/80 backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-900/80">
        <div className="relative flex h-full w-full flex-col rounded-2xl px-2 py-3">
          <button
            onClick={() => setOpen(o => !o)}
            className="text-muted-primary hover:text-primary flex w-full cursor-pointer items-center gap-4 px-4 transition-colors duration-300">
            <div className="bg-primary size-2.5 rounded-full" />
            <motion.span
              key={activeId}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="text-foreground max-w-58 truncate text-base font-medium">
              {headings.find(h => h.id === activeId)?.text ?? headings[0]?.text}
            </motion.span>
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
                <ScrollArea scrollbarGutter className={"h-100"}>
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
                    className="mt-3 space-y-1 pl-2 text-sm">
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
                        className="list-none"
                        style={{
                          paddingLeft: `${(h.level - 2) * 16}px`
                        }}>
                        <a
                          href={`#${h.id}`}
                          className={cn(
                            "block rounded-lg px-2 py-1.5 transition-all duration-200",
                            activeId === h.id
                              ? "bg-secondary text-foreground"
                              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                          )}>
                          {h.text}
                        </a>
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
        className="top-1/2 right-4 z-40 hidden -translate-y-1/2"
      />
    </>
  );
}
