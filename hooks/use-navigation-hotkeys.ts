"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Route } from "next";

import { useSound } from "@/hooks/use-sound";
import { cardSlide5Sound } from "@/sounds/card-slide-5";

import {
  DAILY_DEV_URL,
  DISCORD_URL,
  GITHUB_URL,
  LINKEDIN_URL,
  X_URL
} from "@/lib/constants";
import { usePreferencesStore } from "./use-preferences";

type HotkeyMap = Record<string, string>;

type Options = {
  routes?: HotkeyMap;
};

const EXTERNAL_LINKS = [
  GITHUB_URL,
  X_URL,
  DISCORD_URL,
  LINKEDIN_URL,
  DAILY_DEV_URL,
  `${GITHUB_URL}/minimal-portfolio`
];

export function useNavigationHotkeys(options: Options = {}) {
  const [play] = useSound(cardSlide5Sound);
  const toggleSound = usePreferencesStore(s => s.toggleSound);

  const router = useRouter();

  const {
    routes = {
      h: "/",
      a: "/dsa",
      p: "/projects",
      e: "/#skills",
      c: "/contacts",
      s: "/dev-setup",
      b: "/playbook",
      t: "/templates",
      n: "/networking",
      o: "/sql",
      q: "/playground/sql",
      g: GITHUB_URL,
      i: DISCORD_URL,
      y: `${GITHUB_URL}/minimal-portfolio`,
      x: X_URL,
      l: LINKEDIN_URL,
      z: DAILY_DEV_URL
    }
  } = options;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;

      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (isTyping) return;

      // Ctrl+S / Cmd+S -> Toggle sound
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        toggleSound();
        play();

        return;
      }

      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;

      const key = e.key.toLowerCase();
      const path = routes[key];

      if (!path) return;

      e.preventDefault();

      play();

      if (EXTERNAL_LINKS.includes(path)) {
        window.open(path, "_blank");
        return;
      }

      router.push(path as Route);
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, [router, routes, play, toggleSound]);
}
