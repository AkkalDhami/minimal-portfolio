"use client";

import { useRef } from "react";
import { OnThisPage } from "@/components/docs/on-this-page";

export function DocsLayout({ children }: { children: React.ReactNode }) {
  const docsRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        id="docs-content"
        className="w-full min-w-0 [font-variant-ligatures:none]"
        ref={docsRef}>
        {children}
      </div>

      <OnThisPage docsRef={docsRef} />
    </>
  );
}
