"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { useSound } from "@/hooks/use-sound";
import { click002Sound } from "@/sounds/click-002";

type Options = {
  key?: string;
  requireShift?: boolean;
};

export function useThemeToggleHotkey(options: Options = {}) {
  const { key = "d", requireShift = false } = options;

  const { resolvedTheme, setTheme } = useTheme();
  const [play] = useSound(click002Sound);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;

      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (isTyping) return;

      if (e.key.toLowerCase() !== key.toLowerCase()) return;

      if (requireShift && !e.shiftKey) return;

      const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
      setTheme(nextTheme);
      play();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [key, play, requireShift, resolvedTheme, setTheme]);
}
