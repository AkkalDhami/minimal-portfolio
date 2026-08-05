"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { NoteColor, StickyNote } from "./note";

interface InterviewQProps {
  children: ReactNode;
  className?: string;
}

export function InterviewQ({ children, className }: InterviewQProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.3 }}
      className={cn("my-4 space-y-8", className)}>
      {children}
    </motion.div>
  );
}

interface InterviewQItemProps {
  children: ReactNode;
  className?: string;
}

export function InterviewQItem({ children, className }: InterviewQItemProps) {
  return (
    <div
      className={cn("not-typeset flex flex-col items-start gap-4", className)}>
      {children}
    </div>
  );
}
interface InterviewQuestionProps {
  children: ReactNode;
  className?: string;
  color?: NoteColor;
}

export function InterviewQuestion({
  children,
  className,
  color
}: InterviewQuestionProps) {
  return (
    <div className={cn("not-typeset", className)}>
      <div className="max-w-[95%] min-w-0">
        <StickyNote color={color ?? "emerald"} icon={false} className="my-0">
          {children}
        </StickyNote>
      </div>
    </div>
  );
}

interface InterviewAnswerProps {
  color?: NoteColor;
  children: ReactNode;
  className?: string;
}

export function InterviewAnswer({
  color,
  children,
  className
}: InterviewAnswerProps) {
  return (
    <div className={cn("pl-6 sm:pl-12", className)}>
      <StickyNote color={color ?? "yellow"} icon={false} className="my-0">
        {children}
      </StickyNote>
    </div>
  );
}
