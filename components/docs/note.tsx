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
  indigo: { bg: "var(--color-indigo-100)", pin: "var(--color-indigo-500)" }
} as const;

type NoteColor = keyof typeof NOTE_COLORS;

export function StickyNote({
  children,
  rotate = 0,
  color = "blue"
}: {
  children: React.ReactNode;
  rotate?: number | string;
  color?: NoteColor;
}) {
  const { pin, bg } = NOTE_COLORS[color];
  const deg = Number(rotate);

  return (
    <motion.div
      data-not-typeset
      initial={{
        opacity: 0,
        y: 6,
        rotate: deg,
        filter: "blur(10px)"
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotate: deg,
        filter: "blur(0px)"
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.3,
        ease: "easeOut"
      }}
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
        }
      )}
      style={{
        backgroundColor: bg
      }}>
      <span className="absolute -top-3 right-3 flex items-center justify-center">
        <IconPin
          size={26}
          style={{ color: pin, transform: "rotate(-40deg)" }}
          fill={pin}
          strokeWidth={1.5}
        />
      </span>

      <div
        data-not-typeset
        className="not-typeset text-foregroundd [&_p]:text-foregroundd space-y-4 text-lg leading-snug tracking-wide text-black [&_p]:text-lg [&_p]:leading-snug [&_p]:text-black">
        {children}
      </div>
    </motion.div>
  );
}
