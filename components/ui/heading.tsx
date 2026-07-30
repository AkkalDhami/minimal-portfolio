import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React from "react";

export function Heading({
  children,
  as = "h2",
  className
}: {
  children: React.ReactNode;
  as?: "h1" | "h2";
  className?: string;
}) {
  const Tag = motion[as];

  return (
    <Tag
      className={cn(
        "font-inter mb-3 text-3xl font-semibold sm:text-4xl",
        as === "h2" && "text-2xl font-medium sm:text-3xl",
        className
      )}>
      {children}
    </Tag>
  );
}
