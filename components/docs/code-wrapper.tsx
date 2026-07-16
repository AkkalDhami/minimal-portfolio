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
        docs={false}
        className="group hover:bg-muted absolute right-2 bottom-2.5 z-10 w-auto cursor-pointer p-1.5 text-xs"
      />
      {children}
    </div>
  );
}
