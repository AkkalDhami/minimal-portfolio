import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import { mdxComponents } from "@/components/docs/mdx-components";
import rehypePrettyCode, { LineElement } from "rehype-pretty-code";
import { DEFAULT_CODE_THEME } from "@/lib/constants";
import { OnThisPage } from "@/components/docs/on-this-page";
import { Metadata, Route } from "next";
import { findNeighbour } from "@/lib/source";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

import { PLAYBOOK_DATA } from "@/data/playbook";
import { IPlaybook } from "@/types/app.types";
import { PrimaryButton } from "@/components/ui/primary-button";
import siteConfig from "@/lib/site";
import { cn } from "@/lib/utils";

export const revalidate = false;
export const dynamic = "force-dynamic";
export const dynamicParams = false;

const DOCS_PATH = path.join(process.cwd(), "/docs");

export async function generateStaticParams() {
  const registryParams = PLAYBOOK_DATA.map(({ docs }) => {
    const slugArray = docs.replace("/docs/", "").split("/").filter(Boolean);
    return [...slugArray];
  });

  return [...registryParams];
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const slug = params.slug ?? [];
  const filePath = getDocPath(slug);
  if (!fs.existsSync(filePath)) {
    return {
      title: "Not Found | Playbook"
    };
  }

  const source = fs.readFileSync(filePath, "utf8");
  const { data } = matter(source);
  return {
    title: `${data.title}  | Docs `,
    description: data.description ?? "Docs",
    keywords: siteConfig.keywords,
    openGraph: {
      title: `${data.title}  | Docs `,
      description: data.description ?? "Docs",
      url: `/docs/${slug.length > 0 ? slug.join("/") : ""}`,
      siteName: siteConfig.name,
      type: "article",
      images: [
        {
          url: "/images/og.png",
          width: 1200,
          height: 630,
          alt: siteConfig.name
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: data.title ?? "Playbook",
      description: data.description ?? "Playbook"
    }
  };
}

function getDocPath(slug?: string[]) {
  if (!slug || slug.length === 0) {
    notFound();
  }

  if (slug.length === 2 && slug[1] === "dsa") {
    return path.join(DOCS_PATH, "dsa", `${slug.join("/")}.mdx`);
  }
  return path.join(DOCS_PATH, `${slug.join("/")}.mdx`);
}

export default async function DocsPage(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params;

  const { slug = [] } = params;

  const filePath = getDocPath(slug);
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const lastComponentIndex = slug.length > 0 ? slug.length - 1 : -1;
  const lastSlug =
    lastComponentIndex >= 0 ? slug[lastComponentIndex] : undefined;

  const { next, prev } = lastSlug
    ? findNeighbour(slug[0] === "dsa" ? "dsa" : "playbook", lastSlug as string)
    : { next: undefined, prev: undefined };

  const source = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(source);

  return (
    <div className="flex w-full max-w-4xl gap-8 overflow-x-auto px-4 sm:p-0">
      <div id="docs-content" className="w-full [font-variant-ligatures:none]">
        <article className="prose prose-neutral dark:prose-invert mb-6 max-w-none">
          <div className="my-4">
            <div className="flex items-center justify-between gap-4 pr-2">
              <h2 className="text-2xl font-medium">{data.title}</h2>
              <NextSteps next={next} prev={prev} min />
            </div>
            <OnThisPage />
          </div>
          <MDXRemote
            source={content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                rehypePlugins: [
                  [
                    rehypePrettyCode,
                    {
                      theme: {
                        dark: DEFAULT_CODE_THEME || "github-dark-high-contrast",
                        light: "github-light-default"
                      },
                      keepBackground: false,
                      onVisitLine(node: LineElement) {
                        if (node.children.length === 0) {
                          node.children = [{ type: "text", value: " " }];
                        }
                      }
                    }
                  ]
                ]
              }
            }}
          />
        </article>
        <div className="border-edge border-t px-2 py-2 pt-4">
          <NextSteps next={next} prev={prev} className="mt-3" />
        </div>
      </div>
    </div>
  );
}

const NextSteps = ({
  next,
  prev,
  min,
  className
}: {
  next?: IPlaybook | undefined;
  prev?: IPlaybook | undefined;
  min?: boolean;
  className?: string;
}) => {
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      {prev && (
        <PrimaryButton
          variant="outline"
          className={cn(
            "group font-medium tracking-normal capitalize",
            min ? "px-2 py-2" : "px-4 py-2"
          )}
          as="a"
          href={prev.docs as Route}>
          <div className="flex items-center gap-1">
            <ArrowLeftIcon className="size-4" />
            {!min && <span className="hidden sm:inline"> {prev.title}</span>}
          </div>
        </PrimaryButton>
      )}
      {next && (
        <div className="flex items-center justify-end">
          <PrimaryButton
            variant="outline"
            className={cn(
              "group font-medium tracking-normal capitalize",
              min ? "px-2 py-2" : "px-4 py-2"
            )}
            as="a"
            title={next.title}
            href={next.docs as Route}>
            <div className="flex items-center gap-1">
              {!min && <span className="hidden sm:inline"> {next.title}</span>}
              <ArrowRightIcon className="size-4" />
            </div>
          </PrimaryButton>
        </div>
      )}
    </div>
  );
};
