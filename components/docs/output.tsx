import { ReactNode } from "react";

export default function Output({ children }: { children: ReactNode }) {
  return (
    <pre className="animate-fade-in-blur dark:bg-code max-w-code mt-3 mb-7 flex gap-2 overflow-x-auto rounded-lg border border-neutral-300 bg-neutral-200 px-3 font-mono text-black [font-variant-ligatures:none] dark:border-neutral-800 dark:text-white [&_p]:text-black dark:[&_p]:text-white">
      {children}
    </pre>
  );
}
