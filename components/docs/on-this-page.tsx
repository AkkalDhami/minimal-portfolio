"use client";

import { useEffect, useState } from "react";
import GithubSlugger from "github-slugger";
import { cn } from "@/lib/utils";
import {
  ChartNoAxesGanttIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from "lucide-react";

import { TOCItemType, TOCMinimap } from "@/components/docs/toc-minimap";

type Heading = {
  id: string;
  text: string;
  level: number;
};

// const ITEMS: TOCItemType[] = [
//   { title: "Installation", url: "#installation", depth: 2 },
//   { title: "Usage", url: "#usage", depth: 2 },
//   { title: "API Reference", url: "#api-reference", depth: 2 },
//   { title: "TOCMinimap", url: "#tocminimap", depth: 3 },
//   { title: "TOCItemType", url: "#tocitemtype", depth: 3 },
//   { title: "References", url: "#references", depth: 2 }
// ];

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

    const items = list.map(item => {
      return {
        title: item.text,
        url: `#${item.id}`,
        depth: item.level
      };
    });

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
      <nav className="group bg-muted/50 rounded-primary relative my-6 w-full px-4 py-2">
        <div
          onClick={() => setOpen(o => !o)}
          className="text-muted-primary hover:text-primary my-2 flex cursor-pointer items-center justify-between duration-300">
          <div className="flex items-center gap-2">
            <ChartNoAxesGanttIcon className="text-muted-primary size-5" />
            <h4 className="text-base font-semibold">On This Page</h4>
          </div>
          {open ? (
            <ChevronUpIcon className="size-5" />
          ) : (
            <ChevronDownIcon className="size-5" />
          )}
        </div>

        {open && (
          <ul className="list-inside list-none space-y-2 text-sm">
            {headings.map(h => (
              <li
                key={h.id}
                style={{ paddingLeft: `${(h.level - 2) * 16}px` }}
                className="list-none">
                <a
                  href={`#${h.id}`}
                  className={cn(
                    "transition-colors",
                    activeId === h.id
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
                  )}>
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>

      <TOCMinimap
        items={items}
        className="fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 lg:inline"
      />
    </>
  );
}
