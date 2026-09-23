import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React from "react";

export function SubHeading({
  children,
  as = "p",
  className
}: {
  children: React.ReactNode;
  as?: "h3" | "p";
  className?: string;
}) {
  const Tag = motion[as] || "h3";
  return (
    <Tag
      className={cn(
        "text-muted-foreground max-w-3xl text-base sm:text-lg",
        as === "h3" && "",
        className
      )}>
      {children}
    </Tag>
  );
}
