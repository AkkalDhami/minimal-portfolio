"use client";

import { IconInfoCircle } from "@tabler/icons-react";
import { CopyButton } from "./copy-button";

export default function Note({ text }: { text: string }) {
  return (
    <div className="animate-fade-in-blur group not-typeset max-w-code relative mx-1 my-4 overflow-hidden rounded-lg border border-emerald-500/10 bg-emerald-500/10 py-3 pr-10 pl-4">
      <div className="flex gap-4">
        <div className="mt-0.5 size-4">
          <IconInfoCircle className="size-5 text-emerald-500" />
        </div>

        <p className="not-typeset font-tip text-foreground flex-1 text-xl leading-relaxed tracking-wide">
          {text}
        </p>
      </div>

      <CopyButton
        text={text}
        docs={false}
        className={
          "absolute right-1.5 bottom-1.5 py-1.5 opacity-0 duration-200 group-hover:opacity-100 hover:bg-emerald-500/20"
        }
      />
    </div>
  );
}

import { motion } from "motion/react";
import { IconPin } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const NOTE_COLORS = {
  yellow: { bg: "var(--color-yellow-100)", pin: "var(--color-yellow-600)" },
  pink: { bg: "var(--color-pink-100)", pin: "var(--color-pink-500)" },
  blue: { bg: "var(--color-blue-100)", pin: "var(--color-blue-500)" },
  green: { bg: "var(--color-green-100)", pin: "var(--color-green-500)" },
  red: { bg: "var(--color-red-100)", pin: "var(--color-red-500)" },
  rose: { bg: "var(--color-rose-100)", pin: "var(--color-rose-500)" },
  cyan: { bg: "var(--color-cyan-100)", pin: "var(--color-cyan-500)" },
  indigo: { bg: "var(--color-indigo-100)", pin: "var(--color-indigo-500)" },
  purple: { bg: "var(--color-purple-100)", pin: "var(--color-purple-500)" },
  emerald: { bg: "var(--color-emerald-100)", pin: "var(--color-emerald-500)" },
  amber: { bg: "var(--color-amber-100)", pin: "var(--color-amber-500)" },
  orange: { bg: "var(--color-orange-100)", pin: "var(--color-orange-500)" },
  teal: { bg: "var(--color-teal-100)", pin: "var(--color-teal-500)" },
  sky: { bg: "var(--color-sky-100)", pin: "var(--color-sky-500)" },
  gray: { bg: "var(--color-gray-100)", pin: "var(--color-gray-500)" }
} as const;

export type NoteColor = keyof typeof NOTE_COLORS;

export function StickyNote({
  children,
  color = "blue",
  className,
  icon = true
}: {
  children: React.ReactNode;
  rotate?: number | string;
  color?: NoteColor;
  className?: string;
  icon?: boolean;
}) {
  const { pin, bg } = NOTE_COLORS[color];

  return (
    <motion.div
      className={cn(
        "not-typeset font-handwriting relative my-4 inline-block w-full rounded-lg px-5 py-4",

        {
          "bg-blue-100 dark:bg-blue-600/20": color === "blue"
        },
        {
          "bg-yellow-100 dark:bg-yellow-600/20": color === "yellow"
        },
        {
          "bg-pink-100 dark:bg-pink-600/20": color === "pink"
        },
        {
          "bg-green-100 dark:bg-green-600/20": color === "green"
        },
        {
          "bg-red-100 dark:bg-red-600/20": color === "red"
        },
        {
          "bg-rose-100 dark:bg-rose-600/20": color === "rose"
        },
        {
          "bg-cyan-100 dark:bg-cyan-600/20": color === "cyan"
        },
        {
          "bg-indigo-100 dark:bg-indigo-600/20": color === "indigo"
        },
        {
          "bg-emerald-100 dark:bg-emerald-600/20": color === "indigo"
        },
        {
          "bg-amber-100 dark:bg-amber-600/20": color === "amber"
        },
        {
          "bg-orange-100 dark:bg-orange-600/20": color === "orange"
        },
        {
          "dark:bg-purple-600-100 dark:bg-purple-600-600/20 bg-purple-100":
            color === "purple"
        },
        {
          "bg-teal-100 dark:bg-teal-600/20": color === "teal"
        },
        {
          "bg-sky-100 dark:bg-sky-600/20": color === "sky"
        },
        {
          "bg-gray-100 dark:bg-gray-600/20": color === "gray"
        },
        className
      )}
      style={{
        backgroundColor: bg
      }}>
      {icon && (
        <span className="absolute -top-3 right-3 flex items-center justify-center">
          <IconPin
            size={26}
            style={{ color: pin, transform: "rotate(-40deg)" }}
            fill={pin}
            strokeWidth={1.5}
          />
        </span>
      )}

      <div
        className={cn(
          "not-typeset toc-ignore text-foregroundd [&_p]:text-foregroundd space-y-4 text-lg leading-snug tracking-wide text-black [&_p]:text-lg [&_p]:leading-snug [&_p]:text-black",
          `[&_code]:font-tip [&_code]:border-transparent [&_code]:bg-transparent [&_code]:px-1 [&_code]:py-0 [&_code]:font-semibold [&_code]:tracking-wider [&_code]:text-black`,
          `[&_ul]:list-inside [&_ul]:list-disc [&_ul]:pl-2.5`,
          `[&_h4]:font-handwriting [&_h4]:toc-ignore [&_h4]:text-xl [&_h4]:font-semibold [&_h4]:text-black`,
          `[&_h5]:font-handwriting [&_h5]:toc-ignore [&_h5]:text-lg [&_h5]:font-semibold [&_h5]:text-black`
        )}>
        {children}
      </div>
    </motion.div>
  );
}
