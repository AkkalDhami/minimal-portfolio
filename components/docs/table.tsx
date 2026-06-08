import { ReactNode } from "react";

export function Table({ children }: { children: ReactNode }) {
  return (
    <div className="border-edge animate-fade-in-blur mt-4 mb-8 overflow-x-auto rounded-lg border-x border-t">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  );
}

export function THead({ children }: { children: ReactNode }) {
  return <thead className="bg-muted">{children}</thead>;
}

export function TBody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function TR({ children }: { children: ReactNode }) {
  return <tr className="border-edge border-b">{children}</tr>;
}

export function TH({ children }: { children: ReactNode }) {
  return <th className="px-4 py-3 text-left font-semibold">{children}</th>;
}
export function TD({ children }: { children: ReactNode }) {
  return <td className="text-muted-primary px-4 py-3">{children}</td>;
}

export function Highlight({ children }: { children: ReactNode }) {
  return (
    <span className="dark:bg-muted animate-fade-in-blur text-foreground rounded-md bg-neutral-200 px-2 py-1 font-mono text-sm">
      {children}
    </span>
  );
}
