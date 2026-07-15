"use client";

import { IconChevronRight } from "@tabler/icons-react";
import type { SampleQuery } from "@/types/sql-playground.types";
import { cn } from "@/lib/utils";

interface SampleQueryListProps {
  queries: SampleQuery[];
  onSelect: (query: SampleQuery) => void;
  selectedQueryId: string;
}

export function SampleQueryList({
  queries,
  onSelect,
  selectedQueryId
}: SampleQueryListProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-muted-foreground tracking-wide uppercase">
        Sample queries
      </h3>
      <div className="flex gap-4">
        {queries.map(query => (
          <button
            key={query.id}
            onClick={() => onSelect(query)}
            className={cn(
              "group hover:bg-foreground hover:text-accent text-muted-foreground flex w-full items-center justify-between rounded-md border px-3 py-2 text-left duration-300",
              {
                "bg-foreground text-accent": query.id === selectedQueryId
              }
            )}>
            <span>
              <span className="block font-mono text-xs">{query.label}</span>
              <span className="block font-mono text-[11px]">
                {query.description}
              </span>
            </span>
            <IconChevronRight
              size={14}
              className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
              aria-hidden
            />
          </button>
        ))}
      </div>
    </div>
  );
}
