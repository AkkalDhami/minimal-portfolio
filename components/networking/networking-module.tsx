"use client";

import { IModule } from "@/types/app.types";
import { NetworkingCard } from "./networking-card";
import { useEffect, useRef, useState } from "react";
import {
  ChevronsUpDownIcon,
  ChevronsUpDownIconHandle
} from "@/components/ui/chevrons-up-down-icon";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Route } from "next";
import { cardSlide5Sound } from "@/sounds/card-slide-5";
import { useSound } from "@/hooks/use-sound";

export function NetworkingModule({ module }: { module: IModule }) {
  const [open, setOpen] = useState(false);
  const [play] = useSound(cardSlide5Sound);
  const chevronsUpDownIconRef = useRef<ChevronsUpDownIconHandle>(null);

  useEffect(() => {
    const controls = chevronsUpDownIconRef.current;
    if (!controls) return;

    if (open) {
      controls.startAnimation();
    } else {
      controls.stopAnimation();
    }
  }, [open]);
  return (
    <div className={cn("not-typeset w-full", "screen-line-after")}>
      <div
        data-open={open}
        onClick={() => setOpen(open => !open)}
        className={cn(
          "group flex w-full cursor-pointer justify-between border-b p-4",
          !open && "border-b border-transparent"
        )}>
        <div className="space-y-2">
          <div className="flex gap-3">
            <div className="from-background via-muted to-secondary border-edge rounded-primary primary-ring text-primary flex size-7 items-center justify-center border bg-linear-to-b">
              <module.icon className="size-4" />
            </div>
            <Link
              href={module.docs as Route}
              className="text-xl font-medium tracking-tight underline-offset-2 hover:underline"
              onClick={() => play()}>
              {module.title}
            </Link>
          </div>
          <p className="text-muted-foreground text-lg">{module.description}</p>
        </div>

        <ChevronsUpDownIcon
          ref={chevronsUpDownIconRef}
          duration={0.2}
          className="group-hover:text-accent-foreground text-muted-foreground size-5"
        />
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              filter: "blur(10px)",
              y: 10,
              height: 0
            }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              height: "auto"
            }}
            exit={{
              opacity: 0,
              filter: "blur(10px)",
              y: 10,
              height: 0
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut"
            }}
            className={cn(
              "divide-edge grid w-full divide-y"
              // "sm:grid-cols-2 sm:divide-x"
            )}>
            {module.topics.map(topic => (
              <NetworkingCard
                key={topic.slug}
                data={topic}
                docs={module.docs}
                className="p-0 px-6 py-2 last:border-r"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
