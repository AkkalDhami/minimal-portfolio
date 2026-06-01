import { cn } from "@/lib/utils";

export interface Tech {
  name: string;
}

export function TechBadge({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        `text-accent-foreground border-edge relative mx-0.5 inline-flex items-center border px-3 py-1.5 text-base`,
        className
      )}>
      {children}
    </div>
  );
}
