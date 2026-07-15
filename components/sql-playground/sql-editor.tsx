"use client";

import { useCallback } from "react";
import { IconPlayerPlayFilled, IconLoader2 } from "@tabler/icons-react";
import { SqlCodeEditor } from "@/components/sql-playground/sql-code-editor";
import type { EngineStatus } from "@/types/sql-playground.types";
import { CopyButton } from "@/components/docs/copy-button";

interface SqlEditorProps {
  value: string;
  onChange: (value: string) => void;
  onRun: () => void;
  status: EngineStatus;
  isRunning: boolean;
}

export function SqlEditor({
  value,
  onChange,
  onRun,
  status,
  isRunning
}: SqlEditorProps) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        onRun();
      }
    },
    [onRun]
  );

  return (
    <div className="border-edge no-typeset w-full rounded-lg border">
      <div className="relative flex w-full items-center justify-between border-b px-3 py-3">
        <p className="text-muted-foreground mt-0 text-base">
          Run SQL queries locally in your browser.
        </p>
        <div className="relative flex items-center gap-3">
          {status !== "ready" || isRunning ? (
            <IconLoader2
              className="size-8 animate-spin p-2 text-red-600"
              aria-hidden
            />
          ) : (
            <IconPlayerPlayFilled
              onClick={onRun}
              className="hover:bg-muted text-muted-foreground hover:text-foreground size-8 cursor-pointer rounded-md p-2 duration-300"
              aria-hidden
            />
          )}
          <CopyButton
            text={value}
            docs={false}
            className="group hover:bg-muted relative z-10 size-8 cursor-pointer py-[6.65px] text-xs"
          />

          {/* <IconEraser
            onClick={() => onChange("")}
            className="hover:bg-muted text-muted-foreground hover:text-foreground size-8 cursor-pointer rounded-md p-2 duration-300"
            aria-hidden
          /> */}
        </div>
      </div>

      <SqlCodeEditor
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={
          status === "loading" ? "Loading engine..." : "Write a MySQL query..."
        }
      />
    </div>
  );
}
