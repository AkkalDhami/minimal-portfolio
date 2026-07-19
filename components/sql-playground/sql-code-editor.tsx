"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { getCodeHighlighter } from "@/lib/code-highlight";

interface SqlCodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
}

const SHARED_CLASSES =
  "text-sm whitespace-pre px-4 tracking-wide py-4 font-code leading-6";

export function SqlCodeEditor({
  value,
  onChange,
  onKeyDown,
  placeholder,
  className
}: SqlCodeEditorProps) {
  const [html, setHtml] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    let cancelled = false;
    getCodeHighlighter("sql").then(highlighter => {
      if (cancelled) return;
      // Trailing space keeps the last blank line's caret position accurate.
      const out = highlighter.codeToHtml(value.length ? value : " ", {
        lang: "sql",
        themes: {
          light: "github-light-default",
          dark: "github-dark-default"
        },
        defaultColor: "light-dark()"
      });
      setHtml(out);
    });
    return () => {
      cancelled = true;
    };
  }, [value]);

  function syncScroll() {
    if (!textareaRef.current || !overlayRef.current) return;
    overlayRef.current.scrollTop = textareaRef.current.scrollTop;
    overlayRef.current.scrollLeft = textareaRef.current.scrollLeft;
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    if (!(e.ctrlKey || e.metaKey) || e.key !== "/") return;
    e.preventDefault();
    const textarea = e.currentTarget;
    const { value, selectionStart, selectionEnd } = textarea;
    const start = value.lastIndexOf("\n", selectionStart - 1) + 1;
    const end =
      value.indexOf("\n", selectionEnd) === -1
        ? value.length
        : value.indexOf("\n", selectionEnd);
    const lines = value.slice(start, end).split("\n");
    const shouldUncomment = lines.every(
      line => line.trim() === "" || line.trimStart().startsWith("-- ")
    );
    const updated = lines.map(line => {
      if (line.trim() === "") return line;
      return shouldUncomment
        ? line.replace(/^(\s*)--\s?/, "$1")
        : line.replace(/^(\s*)/, "$1-- ");
    });
    const replacement = updated.join("\n");
    onChange(value.slice(0, start) + replacement + value.slice(end));
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(start, start + replacement.length);
    });
  }

  return (
    <div className={cn("not-typeset relative", className)}>
      <div
        ref={overlayRef}
        aria-hidden
        className={cn(
          SHARED_CLASSES,
          "not-typeset pointer-none overflow-auto",
          "absolute inset-0",
          "[&_pre]:m-0! [&_pre]:bg-transparent! [&_pre]:p-0!",
          "[&_code]:bg-transparent!"
        )}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <textarea
        ref={textareaRef}
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onScroll={syncScroll}
        spellCheck={false}
        placeholder={placeholder}
        className={cn(
          SHARED_CLASSES,
          "caret-foreground placeholder:text-muted-foreground min-h-80 w-full resize-none overflow-auto bg-transparent text-transparent outline-none",
          "relative"
          // "bg-blue-700 text-red-600"
        )}
      />
    </div>
  );
}
