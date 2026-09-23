"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type PortfolioFont =
  | "schibsted"
  | "inter"
  | "geist"
  | "manrope"
  | "space-grotesk"
  | "dm-sans"
  | "bricolage"
  | "plus-jakarta";

export interface AccentColor {
  id: string;
  label: string;
  value: string;
}

export const FONT_OPTIONS: { id: PortfolioFont; label: string }[] = [
  { id: "schibsted", label: "Schibsted" },
  { id: "inter", label: "Inter" },
  { id: "geist", label: "Geist" },
  { id: "manrope", label: "Manrope" },
  { id: "bricolage", label: "Bricolage" },
  { id: "dm-sans", label: "DM Sans" },
  { id: "space-grotesk", label: "Space Grotesk" }
  // { id: "plus-jakarta", label: "Plus Jakarta Sans" }
];

export const ACCENT_COLORS: AccentColor[] = [
  { id: "neutral", label: "Neutral", value: "" },
  { id: "blue", label: "Blue", value: "var(--color-blue-500)" },
  { id: "green", label: "Green", value: "var(--color-green-500)" },
  { id: "orange", label: "Orange", value: "var(--color-orange-500)" },
  { id: "rose", label: "Rose", value: "var(--color-rose-500)" },
  { id: "pink", label: "Pink", value: "var(--color-pink-500)" }
];

interface AppearanceState {
  font: PortfolioFont;
  accentId: string;
  setFont: (font: PortfolioFont) => void;
  setAccent: (accentId: string) => void;
}

export const useAppearanceStore = create<AppearanceState>()(
  persist(
    set => ({
      font: "inter",
      accentId: "neutral",
      setFont: font => set({ font }),
      setAccent: accentId => set({ accentId })
    }),
    {
      name: "portfolio-appearance"
    }
  )
);

export function getPrimaryColor(accentId: string): AccentColor {
  return ACCENT_COLORS.find(c => c.id === accentId) ?? ACCENT_COLORS[0];
}
