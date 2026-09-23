"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  ACCENT_COLORS,
  FONT_OPTIONS,
  useAppearanceStore,
  PortfolioFont
} from "@/hooks/use-appearance";
import { IconCheck } from "@tabler/icons-react";

export const FONT_PREVIEW_STYLE: Record<PortfolioFont, React.CSSProperties> = {
  schibsted: { fontFamily: "var(--font-schibsted, sans-serif)" },
  inter: { fontFamily: "var(--font-inter, sans-serif)" },
  geist: { fontFamily: "var(--font-geist, sans-serif)" },
  manrope: { fontFamily: "var(--font-manrope, sans-serif)" },
  "space-grotesk": { fontFamily: "var(--font-space-grotesk, sans-serif)" },
  "dm-sans": { fontFamily: "var(--font-dm-sans, sans-serif)" },
  bricolage: { fontFamily: "var(--font-bricolage, sans-serif)" },
  "plus-jakarta": { fontFamily: "var(--font-plus-jakarta, sans-serif)" }
};

const panelVariants = {
  initial: { opacity: 0, scale: 0.94, y: -6 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96, y: -4 }
};

const panelTransition = {
  type: "spring",
  stiffness: 500,
  damping: 34,
  mass: 0.7
} as const;

interface SettingsPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  className?: string;
}

export function SettingsPanel({
  open,
  onOpenChange,
  triggerRef,
  className
}: SettingsPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const font = useAppearanceStore(s => s.font);
  const accentId = useAppearanceStore(s => s.accentId);
  const setFont = useAppearanceStore(s => s.setFont);
  const setAccent = useAppearanceStore(s => s.setAccent);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      const target = event.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (triggerRef.current?.contains(target)) return;
      onOpenChange(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [open, onOpenChange, triggerRef]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onOpenChange(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-label="Appearance settings"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={panelVariants}
          transition={panelTransition}
          className={cn(
            "absolute top-full right-0 z-50 mt-2 origin-top-right",
            "w-70 max-w-[calc(100vw-2rem)]",
            "space-y-3 rounded-2xl border border-white/10 bg-zinc-900/95 p-3",
            "shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md",
            className
          )}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            {FONT_OPTIONS.map(option => {
              const isActive = option.id === font;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setFont(option.id)}
                  aria-pressed={isActive}
                  style={FONT_PREVIEW_STYLE[option.id]}
                  className={cn(
                    "relative w-auto flex-1 rounded-lg px-2.5 py-1.5 text-sm font-medium",
                    "text-zinc-400 hover:text-zinc-200",
                    "focus-visible:outline-none"
                  )}>
                  {isActive && (
                    <motion.span
                      layoutId="active-font"
                      className="absolute inset-0 rounded-lg bg-white/10"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                        mass: 0.5
                      }}
                    />
                  )}

                  <span className="relative z-10">{option.label}</span>
                </button>
              );
            })}
          </div>

          <div
            className="my-4 h-px w-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(255,255,255,0.18) 0px, rgba(255,255,255,0.18) 2px, transparent 2px, transparent 6px)"
            }}
            aria-hidden="true"
          />

          <div className="flex items-center justify-between px-1">
            {ACCENT_COLORS.map(color => {
              const isActive = color.id === accentId;
              return (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => setAccent(color.id)}
                  aria-label={`${color.label} accent`}
                  aria-pressed={isActive}
                  className={cn(
                    "relative flex h-5 w-5 items-center justify-center rounded-full transition-transform duration-150",
                    "ring-1 ring-white/10 ring-inset hover:scale-110",
                    isActive && "ring-2 ring-white/70"
                  )}
                  style={{ backgroundColor: color.value }}>
                  {isActive && (
                    <IconCheck
                      className="h-3 w-3 text-white drop-shadow-sm"
                      strokeWidth={3}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
