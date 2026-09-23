"use client";

import { getPrimaryColor, useAppearanceStore } from "@/hooks/use-appearance";
import { useEffect } from "react";

export function AppearanceProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const font = useAppearanceStore(s => s.font);
  const primaryId = useAppearanceStore(s => s.accentId);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-font", font);
    root.style.setProperty("--primary", getPrimaryColor(primaryId).value);
  }, [font, primaryId]);

  return <>{children}</>;
}
