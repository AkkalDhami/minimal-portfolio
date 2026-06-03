import { ReactNode } from "react";

export default function Output({ children }: { children: ReactNode }) {
  return (
    <pre className="animate-fade-in-blur bg-code mt-3 mb-7 flex max-w-210 gap-2 overflow-x-auto rounded-lg border border-neutral-200 px-3 font-mono text-white [font-variant-ligatures:none] dark:border-neutral-900 [&_p]:text-white">
      {children}
    </pre>
  );
}
