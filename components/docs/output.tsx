import { ReactNode } from "react";

export default function Output({ children }: { children: ReactNode }) {
  return (
    <pre className="not-typeset animate-fade-in-blur dark:bg-code max-w-code font-code my-4 flex gap-2 overflow-x-auto rounded-md bg-neutral-200 px-2 text-black [font-variant-ligatures:none] dark:text-white [&_p]:p-2 [&_p]:text-black dark:[&_p]:text-white">
      {children}
    </pre>
  );
}
