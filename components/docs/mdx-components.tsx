import type { MDXComponents } from "mdx/types";
import { Pre } from "./pre";

import PackageManagerTabs from "./package-manager-tabs";
import Code from "./custom-code";
import Note from "./note";
import Output from "./output";
import { cn } from "@/lib/utils";
import { Table, THead, TBody, TR, TH, TD, Highlight } from "./table";
import { getIconForLanguageExtension } from "@/components/docs/icon";

export const mdxComponents: MDXComponents = {
  Table,
  THead,
  TBody,
  TR,
  TH,
  TD,
  Output,
  Highlight,
  pre: Pre,
  PackageManagerTabs,
  Code,
  Note,
  h1: props => <h1 className="text-3xl font-bold tracking-tight" {...props} />,
  h2: props => (
    <h2 className="my-3 text-2xl font-semibold tracking-tight" {...props} />
  ),
  h3: props => (
    <h3
      className="this-page-link mt-4 mb-4 text-xl font-medium tracking-tight"
      {...props}
    />
  ),
  h4: props => (
    <h4 className="mt-4 mb-4 text-lg font-medium tracking-tight" {...props} />
  ),
  h5: props => (
    <h5 className="my-3 text-lg font-medium tracking-tight" {...props} />
  ),
  p: props => <p className="text-muted-primary my-2 leading-7" {...props} />,
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "thin-scrollbar max-h-120 overflow-x-auto px-3 py-2.5 font-mono leading-relaxed",
        className
      )}
      {...props}
    />
  ),
  a: props => (
    <a
      target="_blank"
      className="text-muted-primary hover:text-foreground font-medium underline underline-offset-1"
      {...props}
    />
  ),
  ul: props => (
    <ul className="text-muted-primary list-disc space-y-2.5 pl-6" {...props} />
  ),
  ol: props => (
    <ol
      className="text-muted-primary list-decimal space-y-2.5 pl-6"
      {...props}
    />
  ),
  figcaption: props => {
    const iconExtension =
      "data-language" in props && typeof props["data-language"] === "string"
        ? getIconForLanguageExtension({ extension: props["data-language"] })
        : null;

    return (
      <figcaption
        className={cn(
          "font-code flex items-center gap-2 border-b border-neutral-800 px-4 py-2 text-neutral-400"
        )}
        {...props}>
        {iconExtension}
        {props.children}
      </figcaption>
    );
  },

  strong: props => <strong className="text-primary" {...props} />,
  blockquote: ({ className, ...props }: React.ComponentProps<"blockquote">) => (
    <blockquote
      className={cn(
        "text-primary mt-2 border-l-2 border-neutral-500 pl-3 font-mono italic",
        className
      )}
      {...props}
    />
  ),
  Step: ({ className, ...props }: React.ComponentProps<"h3">) => (
    <h3
      className={cn(
        "text-primary mt-8 mb-3 scroll-m-32 text-xl font-medium tracking-tight",
        className
      )}
      {...props}
    />
  ),
  Steps: ({ className, ...props }: React.ComponentProps<"div">) => (
    <div
      className={cn(
        "[&>h3]:step steps mb-12 [counter-reset:step] md:ml-4 md:border-l md:pl-8",
        className
      )}
      {...props}
    />
  )
};
