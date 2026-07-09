import type { MDXComponents } from "mdx/types";
import { Pre } from "./pre";

import PackageManagerTabs from "./package-manager-tabs";
import Code from "./custom-code";
import Note from "./note";
import Output from "./output";
import { cn } from "@/lib/utils";
import { Table, THead, TBody, TR, TH, TD, Highlight } from "./table";
import { SortingVisualizer as SortingVisualizerComponent } from "./sorting-visualizer";
import { getIconForLanguageExtension } from "@/components/docs/icon";
import { HeadingWithCopy } from "./heading";
import { NetworkingModule } from "./networking-module";
import { NetworkingCard } from "@/components/networking/networking-card";

export const mdxComponents: MDXComponents = {
  Table,
  THead,
  TBody,
  TR,
  TH,
  TD,
  SortingVisualizer: props => <SortingVisualizerComponent {...props} />,
  Output,
  Highlight,
  pre: Pre,
  PackageManagerTabs,
  Code,
  Note,
  NetworkingCard,
  NetworkingModule,
  HR: props => <hr className="my-6" {...props} />,
  h1: props => (
    <HeadingWithCopy
      tag="h1"
      baseClassName="animate-fade-in-blur font-inter text-3xl font-bold tracking-tight"
      {...props}
    />
  ),
  h2: props => (
    <HeadingWithCopy
      tag="h2"
      baseClassName="animate-fade-in-blur font-inter mt-3 mb-3 border-t pt-6 text-2xl font-medium tracking-tight"
      {...props}
    />
  ),
  h3: props => (
    <HeadingWithCopy
      tag="h3"
      baseClassName="this-page-link font-inter animate-fade-in-blur mt-6 mb-3 text-[22px] font-medium tracking-tight"
      {...props}
    />
  ),
  h4: props => (
    <HeadingWithCopy
      tag="h4"
      baseClassName="font-inter animate-fade-in-blur mt-4 mb-5 text-xl font-medium tracking-tight"
      {...props}
    />
  ),
  h5: props => (
    <HeadingWithCopy
      tag="h5"
      baseClassName="animate-fade-in-blur mt-3 mb-4 text-lg font-medium tracking-tight"
      {...props}
    />
  ),
  p: props => (
    <p
      className="text-muted-primary animate-fade-in-blur my-2 leading-7"
      {...props}
    />
  ),
  code: ({ className, ...props }) => (
    <code
      className={cn(
        "thin-scrollbar animate-fade-in-blur max-h-120 overflow-x-auto py-2.5 font-mono leading-relaxed",
        className
      )}
      {...props}
    />
  ),
  a: props => (
    <a
      target="_blank"
      className="text-muted-primary animate-fade-in-blur hover:text-foreground font-medium underline underline-offset-1"
      {...props}
    />
  ),
  ul: props => (
    <ul
      className="text-muted-primary animate-fade-in-blur mb-6 list-disc space-y-2.5 pl-6"
      {...props}
    />
  ),
  li: props => (
    <li className="text-muted-primary animate-fade-in-blur mb-2.5" {...props} />
  ),
  ol: props => (
    <ol
      className="text-muted-primary animate-fade-in-blur mb-6 list-decimal space-y-2.5 pl-6"
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
          "font-code animate-fade-in-blur flex items-center gap-2 rounded-t-lg border-b border-neutral-800 px-4 py-2 text-neutral-400"
        )}
        {...props}>
        {iconExtension}
        {props.children}
      </figcaption>
    );
  },

  strong: props => (
    <strong
      className="text-primary animate-fade-in-blur font-semibold"
      {...props}
    />
  ),
  blockquote: ({ className, ...props }: React.ComponentProps<"blockquote">) => (
    <blockquote
      className={cn(
        "text-foreground animate-fade-in-blur mt-2 border-l-2 border-neutral-500 pl-3 font-mono",
        className
      )}
      {...props}
    />
  ),
  Step: ({ className, ...props }: React.ComponentProps<"h3">) => (
    <h3
      className={cn(
        "text-primary animate-fade-in-blur font-inter mt-8 mb-3 scroll-m-32 text-xl font-medium tracking-tight",
        className
      )}
      {...props}
    />
  ),
  Steps: ({ className, ...props }: React.ComponentProps<"div">) => (
    <div
      className={cn(
        "[&>h3]:step animate-fade-in-blur steps mb-12 [counter-reset:step] md:ml-4 md:border-l md:pl-8",
        className
      )}
      {...props}
    />
  )
};
