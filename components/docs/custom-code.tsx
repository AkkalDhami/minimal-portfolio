import React from "react";

export default function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="bg-muted rounded-primary text-accent-foreground border border-neutral-500/10 px-2 py-0.5">
      {children}
    </code>
  );
}
