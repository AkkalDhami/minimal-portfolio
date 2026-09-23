"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconSettings } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { SettingsPanel } from "./settings-panel";
import { cn } from "@/lib/utils";

interface CustomizationTriggerProps {
  className?: string;
}

export function CustomizationTrigger({ className }: CustomizationTriggerProps) {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Click outside to close
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    if (open) {
      document.addEventListener("mousedown", handleClick);
      document.addEventListener("keydown", handleKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div
      className={cn("fixed top-3.5 right-4 z-50", className)}
      ref={containerRef}>
      <Button
        variant="outline"
        size="icon-sm"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="primary-ring bg-linear-b relative">
        <motion.span
          animate={{ rotate: open ? 75 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex">
          <IconSettings className="size-5" />
        </motion.span>
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, scale: 0.94, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -4 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
              mass: 0.6
            }}
            className="absolute right-0 z-50 mt-1 origin-top-right">
            <SettingsPanel
              open={open}
              onOpenChange={setOpen}
              triggerRef={containerRef}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
