"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Route } from "next";

import { useSound } from "@/hooks/use-sound";
import { cardSlide5Sound } from "@/sounds/card-slide-5";

import {
  DAILY_DEV_URL,
  GITHUB_URL,
  LINKEDIN_URL,
  X_URL
} from "@/lib/constants";

type HotkeyMap = Record<string, string>;

type Options = {
  routes?: HotkeyMap;
};

export function useNavigationHotkeys(options: Options = {}) {
  const [play] = useSound(cardSlide5Sound);
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
      g: GITHUB_URL,
      y: `${GITHUB_URL}/akkal-portfolio`,
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

      const key = e.key.toLowerCase();

      if (e.shiftKey) return;

      const path = routes[key];
      if (!path) return;

      e.preventDefault();
      if (
        [
          GITHUB_URL,
          X_URL,
          LINKEDIN_URL,
          DAILY_DEV_URL,
          `${GITHUB_URL}/akkal-portfolio`
        ].includes(path)
      ) {
        window.open(path, "_blank");
        play();
        return;
      }

      router.push(path as Route);
      play();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [router, routes, play]);
}
