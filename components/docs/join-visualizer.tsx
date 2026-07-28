"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  IconTable,
  IconCheck,
  IconX,
  IconArrowRight,
  IconMinus
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

type Author = { id: number; name: string };
type Book = { id: number; title: string; author_id: number | null };

const AUTHORS: Author[] = [
  { id: 1, name: "Frank Herbert" },
  { id: 2, name: "George Orwell" },
  { id: 3, name: "Agatha Christie" }
];

const BOOKS: Book[] = [
  { id: 1, title: "Dune", author_id: 1 },
  { id: 2, title: "Dune Messiah", author_id: 1 },
  { id: 3, title: "1984", author_id: 2 },
  { id: 4, title: "Untitled Draft", author_id: null }
];

const JOIN_TYPES = ["INNER", "LEFT", "RIGHT", "FULL", "CROSS"] as const;
type JoinType = (typeof JOIN_TYPES)[number];

const JOIN_META: Record<
  JoinType,
  { label: string; accent: string; sql: string; description: string }
> = {
  INNER: {
    label: "Inner Join",
    accent: "var(--color-orange-500)",
    sql: "FROM books\nINNER JOIN authors ON books.author_id = authors.id",
    description: "Only rows that match in both tables."
  },
  LEFT: {
    label: "Left Join",
    accent: "var(--color-blue-500)",
    sql: "FROM books\nLEFT JOIN authors ON books.author_id = authors.id",
    description: "All books, matched author or NULL."
  },
  RIGHT: {
    label: "Right Join",
    accent: "var(--color-green-500)",
    sql: "FROM books\nRIGHT JOIN authors ON books.author_id = authors.id",
    description: "All authors, matched book or NULL."
  },
  FULL: {
    label: "Full Join",
    accent: "var(--color-purple-500)",
    sql: "FROM books\nFULL JOIN authors ON books.author_id = authors.id",
    description: "Every row from both sides, matched where possible."
  },
  CROSS: {
    label: "Cross Join",
    accent: "var(--color-cyan-500)",
    sql: "FROM books\nCROSS JOIN authors",
    description: "Every book paired with every author — no ON condition."
  }
};

// Row model + join computation

type ResultRow = {
  key: string;
  book: Book | null;
  author: Author | null;
  matched: boolean;
};

function computeJoin(type: JoinType): ResultRow[] {
  if (type === "CROSS") {
    return BOOKS.flatMap(book =>
      AUTHORS.map(author => ({
        key: `b${book.id}-a${author.id}`,
        book,
        author,
        matched: true
      }))
    );
  }

  const bookRows: ResultRow[] = BOOKS.map(book => {
    const author = AUTHORS.find(a => a.id === book.author_id) ?? null;
    return {
      key: `b${book.id}`,
      book,
      author,
      matched: author !== null
    };
  });

  const matchedAuthorIds = new Set(
    bookRows.filter(r => r.matched).map(r => r.author!.id)
  );
  const unmatchedAuthorRows: ResultRow[] = AUTHORS.filter(
    a => !matchedAuthorIds.has(a.id)
  ).map(author => ({
    key: `a${author.id}`,
    book: null,
    author,
    matched: false
  }));

  switch (type) {
    case "INNER":
      return bookRows.filter(r => r.matched);
    case "LEFT":
      return bookRows;
    case "RIGHT":
      return [...bookRows.filter(r => r.matched), ...unmatchedAuthorRows];
    case "FULL":
      return [...bookRows, ...unmatchedAuthorRows];
  }
}

export function JoinVisualizer({ title }: { title?: string }) {
  const [joinType, setJoinType] = useState<JoinType>("INNER");
  const meta = JOIN_META[joinType];
  const rows = useMemo(() => computeJoin(joinType), [joinType]);

  const bookIncluded = new Set(rows.filter(r => r.book).map(r => r.book!.id));
  const authorIncluded = new Set(
    rows.filter(r => r.author).map(r => r.author!.id)
  );

  return (
    <div className="border-border not-typeset dark:bg-card text-card-foreground w-full rounded-lg border bg-neutral-100 p-4">
      <div className="mb-1 flex items-center gap-2">
        <h2 className="text-lg font-medium tracking-wide uppercase">
          {title ?? "SQL Join Visualizer"}
        </h2>
      </div>
      <p className="text-muted-foreground/80 mb-5 text-sm">
        See how each join type decides which rows survive.
      </p>

      <div className="mb-6 flex flex-wrap gap-2">
        {JOIN_TYPES.map(type => {
          const active = type === joinType;
          const m = JOIN_META[type];
          return (
            <button
              key={type}
              onClick={() => setJoinType(type)}
              className={cn(
                "relative rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                active
                  ? `border-[${m.accent}] text-[${m.accent}] bg-[${m.accent}]`
                  : "border-edge text-muted-foreground"
              )}
              style={{
                borderColor: active ? m.accent : "",
                color: active ? m.accent : "",
                backgroundColor: active ? `${m.accent}1a` : ""
              }}>
              {m.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={joinType}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.18 }}
          className="mb-6">
          <pre className="border-border bg-muted/50 font-code overflow-x-auto rounded-lg border px-4 py-3 text-xs leading-relaxed">
            <code style={{ color: meta.accent }}>{meta.sql}</code>
          </pre>
          <p className="text-muted-foreground mt-2 text-xs">
            {meta.description}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <SourceTable
          title="books"
          rows={BOOKS.map(b => ({
            id: b.id,
            label: b.title,
            included: bookIncluded.has(b.id)
          }))}
          accent={meta.accent}
        />
        <SourceTable
          title="authors"
          rows={AUTHORS.map(a => ({
            id: a.id,
            label: a.name,
            included: authorIncluded.has(a.id)
          }))}
          accent={meta.accent}
        />
      </div>

      <div className="text-muted-foreground/60 mb-4 flex justify-center">
        <IconArrowRight size={18} className="rotate-90" />
      </div>

      <div className="border-border overflow-hidden rounded-xl border">
        <div
          className="flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-wide uppercase"
          style={{ backgroundColor: `${meta.accent}1a`, color: meta.accent }}>
          <IconTable size={14} />
          Result &middot; {rows.length} row{rows.length === 1 ? "" : "s"}
        </div>

        <table className="w-full font-mono text-sm">
          <thead>
            <tr className="text-muted-foreground border-border border-b text-xs">
              <th className="px-4 py-2 text-left font-normal">title</th>
              <th className="px-4 py-2 text-left font-normal">name</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {rows.map(row => (
                <motion.tr
                  key={row.key}
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-border/60 border-b last:border-b-0">
                  <td className="px-4 py-2">
                    <Cell value={row.book?.title} accent={meta.accent} />
                  </td>
                  <td className="px-4 py-2">
                    <Cell value={row.author?.name} accent={meta.accent} />
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SourceTable({
  title,
  rows,
  accent
}: {
  title: string;
  rows: { id: number; label: string; included: boolean }[];
  accent: string;
}) {
  return (
    <div className="border-border overflow-hidden rounded-xl border">
      <div className="text-muted-foreground border-border flex items-center gap-1.5 border-b px-3 py-2 text-xs font-medium">
        <IconTable size={13} />
        {title}
      </div>
      <ul>
        {rows.map(r => (
          <li
            key={r.id}
            className="border-border/60 text-foreground flex items-center justify-between border-b px-3 py-1.5 font-mono text-xs transition-opacity last:border-b-0"
            style={{ opacity: r.included ? 1 : 0.35 }}>
            <span className="truncate">{r.label}</span>
            {r.included ? (
              <IconCheck size={13} style={{ color: accent }} />
            ) : (
              <IconX size={13} className="text-muted-foreground" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Cell({ value, accent }: { value?: string; accent: string }) {
  if (value === undefined) {
    return (
      <span className="text-muted-foreground inline-flex items-center gap-1 italic">
        <IconMinus size={11} />
        NULL
      </span>
    );
  }
  return <span style={{ color: accent }}>{value}</span>;
}
