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
import { ClientServerDiagram } from "./client-server-diagram";
import { HowBrowserLoadsWebsite } from "./how-browser-loads-website";
import { NetworkingCard } from "@/components/networking/networking-card";
import { SqlPlayground } from "@/components/sql-playground/sql-playground";
import Link from "next/link";
import { ZoomableImage } from "./zoomable-image";
import { JoinVisualizer } from "./join-visualizer";

export const mdxComponents: MDXComponents = {
  Table,
  THead,
  TBody,
  TR,
  TH,
  TD,
  ZoomableImage,
  JoinVisualizer,

  SortingVisualizer: props => <SortingVisualizerComponent {...props} />,
  Output,
  Highlight,
  pre: Pre,
  PackageManagerTabs,
  Code,
  Note,
  NetworkingCard,
  NetworkingModule,
  ClientServerDiagram,
  HowBrowserLoadsWebsite,
  SqlPlayground: props => <SqlPlayground docs={true} {...props} />,

  HR: props => <hr className="my-6" {...props} />,
  HLink: props => (
    <Link
      className="not-typeset underline-offset-4 hover:underline"
      {...props}
    />
  ),
  h1: props => (
    <HeadingWithCopy
      tag="h1"
      baseClassName="animate-fade-in-blur text-2xl font-medium font-inter"
      {...props}
    />
  ),
  h2: props => (
    <HeadingWithCopy
      tag="h2"
      baseClassName="animate-fade-in-blur font-inter"
      {...props}
    />
  ),
  h3: props => <h3 className="this-page-link font-inter" {...props} />,
  h5: props => (
    <h5
      className="animate-fade-in-blur text-accent-foreground text-[18px] font-normal tracking-tight"
      {...props}
    />
  ),
  p: props => (
    <p className="text-muted-primary animate-fade-in-blur" {...props} />
  ),
  code: ({ className, ...props }) => {
    return (
      <code
        className={cn(
          "thin-scrollbar animate-fade-in-blur scroll-fade-y max-h-120 overflow-x-auto rounded-none py-2.5 font-mono text-base leading-relaxed sm:text-base",
          className
        )}
        {...props}
      />
    );
  },
  a: props => (
    <Link
      target="_blank"
      className="text-muted-primary not-typeset animate-fade-in-blur hover:text-foreground underline underline-offset-2"
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
          "font-code animate-fade-in-blur not-typeset text-muted-foreground flex items-center gap-2 rounded-t-lg border-b px-4 py-2 text-base"
        )}
        {...props}>
        {iconExtension}
        {props.children}
      </figcaption>
    );
  },

  strong: props => (
    <strong className="animate-fade-in-blur font-semibold" {...props} />
  ),

  // blockquote: ({ className, ...props }: React.ComponentProps<"blockquote">) => (
  //   <blockquote
  //     className={cn(
  //       "text-foreground animate-fade-in-blur mt-2 border-l-2 border-neutral-500 pl-3 font-mono",
  //       className
  //     )}
  //     {...props}
  //   />
  // ),
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
