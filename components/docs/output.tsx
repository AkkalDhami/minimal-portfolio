import { CODE_THEME_BG } from "@/lib/constants";
import { ReactNode } from "react";

export default function Output({ children }: { children: ReactNode }) {
  return (
    <pre
      style={{
        backgroundColor: CODE_THEME_BG
      }}
      className="animate-fade-in-blur my-3 flex gap-2 overflow-x-auto rounded-lg border border-neutral-200 px-3 text-white [font-variant-ligatures:none] sm:max-w-210 dark:border-neutral-900 [&_p]:text-white">
      {children}
    </pre>
  );
}
