"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  IconSettings,
  IconVolume,
  IconVolumeOff,
  IconChevronRight,
  IconChevronLeft,
  IconCheck,
  IconSearch,
  IconCode
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// import { Separator } from "@/components/ui/separator";
import { CODE_THEMES, ITheme } from "@/lib/code-theme";

type View = "main" | "theme";

interface SettingsDropdownProps {
  theme?: string;
  onThemeChange?: (value: string) => void;
  soundEnabled?: boolean;
  onSoundToggle?: (enabled: boolean) => void;
}

export function SettingsDropdown({
  theme: controlledTheme,
  onThemeChange,
  soundEnabled: controlledSound,
  onSoundToggle
}: SettingsDropdownProps) {
  const [open, setOpen] = React.useState(false);
  const [view, setView] = React.useState<View>("main");
  const [query, setQuery] = React.useState("");
  const [internalTheme, setInternalTheme] = React.useState("vesper");
  const [internalSound, setInternalSound] = React.useState(true);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const theme = controlledTheme ?? internalTheme;
  const sound = controlledSound ?? internalSound;

  const setTheme = (value: string) => {
    onThemeChange?.(value);
    setInternalTheme(value);
  };

  const toggleSound = () => {
    const next = !sound;
    onSoundToggle?.(next);
    setInternalSound(next);
  };

  // Click outside + escape to close
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
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  // Reset to main view after close animation finishes
  React.useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setView("main");
        setQuery("");
      }, 200);
      return () => clearTimeout(t);
    }
  }, [open]);

  const filtered = CODE_THEMES.filter(t =>
    t.label.toLowerCase().includes(query.toLowerCase())
  );

  const activeThemeLabel =
    CODE_THEMES.find(t => t.value === theme)?.label ?? "Select theme";

  return (
    <div className="relative inline-block" ref={containerRef}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-haspopup="menu">
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
            className="bg-popover absolute right-0 z-50 mt-2 w-64 origin-top-right overflow-hidden rounded-xl border backdrop-blur-xl">
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 400, damping: 32 }}>
              <AnimatePresence mode="wait" initial={false}>
                {view === "main" ? (
                  <motion.div
                    key="main"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.16 }}
                    className="p-1.5">
                    <button
                      onClick={toggleSound}
                      className="group text-muted-foreground flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-sm transition-colors hover:bg-white/6">
                      <span className="flex items-center gap-2.5">
                        <motion.span
                          key={sound ? "on" : "off"}
                          initial={{ scale: 0.6, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 20
                          }}>
                          {sound ? (
                            <IconVolume className="text-muted-foreground size-4.5" />
                          ) : (
                            <IconVolumeOff className="text-muted-foreground size-4.5" />
                          )}
                        </motion.span>
                        Sound
                      </span>
                      <span
                        className={cn(
                          `relative h-5 w-9 rounded-full transition-colors duration-200`,
                          sound ? "bg-foreground" : "bg-background"
                        )}>
                        <motion.span
                          className={cn(
                            "absolute top-0.5 size-4 rounded-full shadow",
                            sound ? "bg-background" : "bg-foreground"
                          )}
                          animate={{ left: sound ? 18 : 2 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30
                          }}
                        />
                      </span>
                    </button>

                    {/* <Separator /> */}

                    <button
                      onClick={() => setView("theme")}
                      className="text-muted-foreground hidden w-full items-center justify-between rounded-lg px-2.5 py-2 text-sm transition-colors hover:bg-white/6">
                      <span className="flex items-center gap-2.5">
                        <IconCode className="text-muted-foreground size-4" />
                        Code Theme
                      </span>
                      <span className="text-muted-foreground flex items-center gap-1 text-xs font-medium">
                        {activeThemeLabel}
                        <IconChevronRight className="size-3.5" />
                      </span>
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="theme"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.16 }}
                    className="flex max-h-96 flex-col">
                    <div className="flex items-center gap-1 border-b border-white/6 p-1.5">
                      <button
                        onClick={() => setView("main")}
                        className="text-muted-foreground hover:text-foreground flex items-center justify-center rounded-lg p-1.5 transition-colors hover:bg-white/6"
                        aria-label="Back">
                        <IconChevronLeft className="size-4" />
                      </button>
                      <span className="text-muted-foreground text-sm font-medium">
                        Code Theme
                      </span>
                    </div>

                    <div className="p-1.5 pb-0">
                      <div className="flex items-center gap-2 rounded-md border px-2.5 py-1.5">
                        <IconSearch className="text-muted-foreground size-4" />
                        <input
                          autoFocus
                          value={query}
                          onChange={e => setQuery(e.target.value)}
                          placeholder="Search themes..."
                          className="w-full bg-transparent text-sm focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="max-h-72 overflow-y-auto p-1.5 [scrollbar-width:thin]">
                      <ThemeGroup
                        label="All Themes"
                        items={filtered}
                        activeValue={theme}
                        onSelect={v => {
                          setTheme(v);
                          setOpen(false);
                        }}
                      />
                      {filtered.length === 0 && (
                        <p className="px-2.5 py-6 text-center text-xs text-neutral-500">
                          No themes found
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ThemeGroup({
  label,
  items,
  activeValue,
  onSelect
}: {
  label: string;
  items: ITheme[];
  activeValue: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="mb-1">
      <p className="text-muted-foreground px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase">
        {label}
      </p>
      {items.map((t, i) => {
        const active = t.value === activeValue;
        return (
          <motion.button
            key={t.value}
            onClick={() => onSelect(t.value)}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.015, duration: 0.12 }}
            className={cn(
              "mt-0.5 flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-left text-sm transition-colors",
              active
                ? "bg-muted"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}>
            <span className="flex items-center gap-2">{t.label}</span>
            {active && <IconCheck className="text-foreground size-3.5" />}
          </motion.button>
        );
      })}
    </div>
  );
}
