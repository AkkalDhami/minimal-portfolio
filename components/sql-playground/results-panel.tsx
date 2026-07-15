"use client";

import { AnimatePresence, motion } from "motion/react";
import { IconAlertTriangle, IconCircleCheck } from "@tabler/icons-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { QueryResult } from "@/types/sql-playground.types";

interface ResultsPanelProps {
  result: QueryResult | null;
  error: string | null;
}

export function ResultsPanel({ result, error }: ResultsPanelProps) {
  return (
    <div className="border-border no-typeset space-y-4 border-t pt-4">
      <AnimatePresence mode="sync">
        <h3 className="from-semibold text-xl">Output</h3>
        {error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="border-destructive/20 bg-destructive/10 text-destructive font-code flex items-start gap-2 rounded-md border px-4 py-3 text-base">
            <IconAlertTriangle className="mt-1 size-4 shrink-0" aria-hidden />
            <span className="leading-relaxed whitespace-pre-wrap">{error}</span>
          </motion.div>
        ) : !result ? (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-muted-foreground font-mono text-sm">
            Write a query above and run it.
          </motion.p>
        ) : result.rowCount === 0 && result.columns.length === 0 ? (
          <motion.p
            key="no-rows"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-muted-foreground mt-0 font-mono text-sm">
            Query executed successfully with no result set (e.g. an INSERT,
            UPDATE, or DDL statement).
          </motion.p>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="space-y-6">
            <ScrollArea className="border-border rounded-md border">
              <table className="font-code mt-0 w-full border-collapse text-sm">
                <thead>
                  <tr>
                    {result.columns.map(col => (
                      <th
                        key={col}
                        className="border-border bg-secondary/40 border-b px-3 py-2 text-left font-mono font-medium whitespace-nowrap">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.rows.map((row, ri) => (
                    <tr key={ri} className="hover:bg-primary/5">
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          className="border-border/60 text-muted-foreground border-b px-3 py-2 whitespace-nowrap last:border-b">
                          {cell === null ? (
                            <span className="text-muted-foreground italic">
                              null
                            </span>
                          ) : (
                            String(cell)
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </ScrollArea>
            <div className="bg-muted/20 mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border px-4 py-3">
              <div className="flex items-center gap-2">
                <IconCircleCheck
                  className="size-5 text-green-500"
                  aria-hidden
                />

                <p className="mt-0 text-sm">Query executed successfully</p>
              </div>

              <div className="text-muted-foreground flex items-center gap-4">
                <p className="mt-0">{result.elapsedMs.toFixed(1)} ms</p>
                <p className="mt-0">
                  {result.rowCount} row{result.rowCount === 1 ? "" : "s"}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
