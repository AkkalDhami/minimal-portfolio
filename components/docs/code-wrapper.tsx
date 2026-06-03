"use client";

import { CopyButton } from "./copy-button";

export function CodeWrapper({
  children,
  code
}: {
  children: React.ReactNode;
  code: string;
}) {
  return (
    <div className="relative bg-transparent">
      <CopyButton
        text={code}
        docs={true}
        className="group bg-code absolute top-1/2 right-2 z-10 w-auto -translate-y-1/2 cursor-pointer p-1.5 text-xs hover:bg-neutral-800 dark:hover:bg-neutral-800"
      />
      {children}
    </div>
  );
}
