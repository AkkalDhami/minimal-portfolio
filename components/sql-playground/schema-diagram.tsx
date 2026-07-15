"use client";

import { motion } from "motion/react";
import { IconKey } from "@tabler/icons-react";
import type { TableSchema } from "@/types/sql-playground.types";
import { cn } from "@/lib/utils";

interface SchemaDiagramProps {
  tables: TableSchema[];
}

export function SchemaDiagram({ tables }: SchemaDiagramProps) {
  return (
    <div className="flex flex-wrap items-center gap-0">
      {tables.map((table, i) => (
        <div key={table.name} className="flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.35, ease: "easeOut" }}
            className="border-border bg-card min-w-42.5 rounded-md border px-3.5 py-2.5 font-mono text-xs">
            <div className="text-primary mb-1.5 font-medium">{table.name}</div>
            <ul className="space-y-1">
              {table.columns.map(col => (
                <li
                  key={col.name}
                  className={cn(
                    "flex items-center gap-1.5",
                    col.isPrimaryKey
                      ? "text-muted-foreground"
                      : "text-muted-foreground/70"
                  )}>
                  {col.isPrimaryKey ? (
                    <IconKey size={11} className="text-primary" aria-hidden />
                  ) : (
                    <span className="w-2.75" />
                  )}
                  {col.name}
                </li>
              ))}
            </ul>
          </motion.div>

          {i < tables.length - 1 && (
            <div className="relative mx-1 h-px w-10 shrink-0 self-center bg-[repeating-linear-gradient(90deg,hsl(var(--border))_0px,hsl(var(--border))_5px,transparent_5px,transparent_9px)]">
              <span className="text-muted-foreground/70 absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] whitespace-nowrap">
                1:N
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
