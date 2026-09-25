import { cn } from "cn";
import { Route } from "next";
import Link from "next/link";

export const Link0 = ({
  children,
  href,
  className
}: React.ComponentProps<"a"> & {
  children: React.ReactNode;
  href: string;
  className?: string;
}) => {
  return (
    <Link
      href={href as Route}
      target="_blank"
      className={cn(
        "group relative flex items-center",
        className,
        "text-muted-foreground hover:text-primary before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:h-[0.05em] before:w-full before:bg-current before:content-['']",
        "before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-in-out",
        "hover:before:origin-left hover:before:scale-x-100"
      )}>
      {children}
    </Link>
  );
};

export const Link1 = ({
  children,
  href,
  className
}: React.ComponentProps<"a"> & {
  children: React.ReactNode;
  href: string;
  className?: string;
}) => {
  return (
    <Link
      href={href as Route}
      target="_blank"
      className={cn(
        "group text-muted-foreground hover:text-primary relative flex items-center",
        "before:pointer-events-none before:absolute before:top-[1.5em] before:left-0 before:h-[0.06em] before:w-full before:bg-current before:content-['']",
        "before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-in-out",
        "hover:before:origin-left hover:before:scale-x-100",
        className
      )}>
      {children}
    </Link>
  );
};
export const Link2 = ({
  children,
  href,
  className
}: React.ComponentProps<"a"> & {
  children: React.ReactNode;
  href: string;
  className?: string;
}) => {
  return (
    <Link
      href={href as Route}
      className={cn(
        "group relative flex items-center",
        className,
        "before:pointer-events-none before:absolute before:top-[1.5em] before:left-0 before:h-[0.05em] before:w-full before:bg-current before:content-['']",
        "before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-in-out",
        "before:origin-left",
        "hover:before:origin-right hover:before:scale-x-100"
      )}>
      {children}
      <svg
        className="mt-0 ml-[0.3em] size-[0.55em] translate-y-1 opacity-0 transition-all duration-300 [motion-reduce:transition-none] group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none"
        fill="none"
        viewBox="0 0 10 10"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true">
        <path
          d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"></path>
      </svg>
    </Link>
  );
};
