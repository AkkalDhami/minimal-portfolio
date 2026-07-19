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
          "thin-scrollbar not-typeset bg-background animate-fade-in-blur text-muted-foreground relative rounded-lg font-mono",
          className
        )}>
        <CopyButton
          text={code}
          docs={false}
          className="group bg-code absolute right-4 bottom-3.5 z-10 cursor-pointer text-xs"
        />
        {children}
      </pre>
    </div>
  );
}
