"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { NoteColor, StickyNote } from "./note";
import Image from "next/image";

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
    <div
      className={cn("not-typeset flex max-w-[85%] min-w-0 gap-2", className)}>
      <Image
        src="/images/profile2.png"
        alt="Interview Question"
        width={24}
        height={24}
        className="hidden size-12 rounded-full sm:block"
      />
      {/* <div className=""> */}
      <StickyNote
        color={color ?? "emerald"}
        icon={false}
        className="my-0 rounded-xl rounded-bl-none">
        {children}
      </StickyNote>
      {/* </div> */}
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
    <div className={cn("flex items-end gap-2 pl-8 sm:pl-20", className)}>
      <StickyNote
        color={color ?? "yellow"}
        icon={false}
        className="my-0 rounded-xl rounded-br-none">
        {children}
      </StickyNote>
      <Image
        src="/images/profile3.png"
        alt="Interview Answer"
        width={24}
        height={24}
        className="hidden size-12 -scale-x-100 rounded-full sm:block"
      />
    </div>
  );
}
