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
import { IconVolume, IconVolumeOff } from "@tabler/icons-react";
import { usePreferencesStore } from "@/hooks/use-preferences";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

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
  const { toggleSound, soundEnabled } = usePreferencesStore();

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
            "bg-background/95 border-muted space-y-4 rounded-2xl border p-3",
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
                    "text-muted-foreground hover:text-primary",
                    "focus-visible:outline-none",
                    isActive && "text-primary"
                  )}>
                  {isActive && (
                    <motion.span
                      layoutId="active-font"
                      className="bg-primary/10 absolute inset-0 rounded-lg"
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
                    "h-5 w-5 rounded-full transition-all duration-150",
                    "border-muted border-2 hover:scale-110",
                    isActive &&
                      "ring-offset-background border-white ring-2 ring-offset-1"
                  )}
                  style={{
                    backgroundColor: color.value,
                    ...(isActive && {
                      outline: `2px solid ${color.value}`
                    })
                  }}
                />
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

          <button
            className="bg-muted/40 text-muted-foreground hover:text-foreground flex w-full items-center justify-between gap-2 rounded-lg px-3 py-1.5"
            type="button"
            onClick={toggleSound}>
            <div className="flex items-center justify-center gap-1">
              {soundEnabled ? (
                <IconVolume className="size-5" />
              ) : (
                <IconVolumeOff className="size-5" />
              )}
              Toggle Sound
            </div>
            <KbdGroup>
              <Kbd>ctrl</Kbd>
              <Kbd>s</Kbd>
            </KbdGroup>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
