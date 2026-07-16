import { ReactNode } from "react";

export default function Output({ children }: { children: ReactNode }) {
  return (
    <pre className="not-typeset animate-fade-in-blur max-w-code font-code text-muted-foreground [&_p]:text-muted-primary my-4 flex gap-2 overflow-x-auto rounded-md bg-neutral-200 px-2 [font-variant-ligatures:none] dark:bg-[#121212] [&_p]:p-2">
      {children}
    </pre>
  );
}
