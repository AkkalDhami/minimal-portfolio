"use client";

import * as React from "react";
import { CopyButton } from "@/components/docs/copy-button";
import { cn } from "@/lib/utils";

export function Pre({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) {
  const ref = React.useRef<HTMLPreElement>(null);
  const [code, setCode] = React.useState("");

  React.useEffect(() => {
    if (!ref.current) return;

    const codeText =
      ref.current.querySelector("code")?.textContent ??
      ref.current.innerText ??
      "";

    setCode(codeText);
  }, [children]);

  return (
    <div className="sm:max-w-code scroll-fade relative overflow-x-auto [font-variant-ligatures:none]">
      <pre
        ref={ref}
        {...props}
        className={cn(
          "thin-scrollbar not-typeset bg-code animate-fade-in-blur relative rounded-lg font-mono text-sm text-neutral-300",
          className
        )}>
        <CopyButton
          text={code}
          docs={true}
          className="group bg-code absolute right-4 bottom-3.5 z-10 cursor-pointer py-[6.65px] text-xs hover:bg-neutral-800 hover:text-white"
        />
        {children}
      </pre>
    </div>
  );
}
