import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import { mdxComponents } from "@/components/docs/mdx-components";
import rehypePrettyCode from "rehype-pretty-code";
import { DEFAULT_CODE_THEME } from "@/lib/constants";
import { Metadata, Route } from "next";
import { findNeighbour } from "@/lib/source";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

import { PLAYBOOK_DATA } from "@/data/playbook";
import { IPlaybook } from "@/types/app.types";
import { PrimaryButton } from "@/components/ui/primary-button";
import siteConfig from "@/lib/site";
import { cn } from "@/lib/utils";
import { sliceContent } from "@/utils/slice-content";
import { ShareMenu } from "@/components/ui/share-menu";
import { NETWORKING_DATA } from "@/data/networking";
import { DSA_DATA } from "@/data/dsa";
import { DocsLayout } from "@/components/layouts/docs-layout";

export const dynamic = "force-static";
export const dynamicParams = false;
export const revalidate = false;

const DOCS_PATH = path.join(process.cwd(), "docs");

export async function generateStaticParams() {
  const playbookParams = PLAYBOOK_DATA.map(doc =>
    doc.docs.replace("/docs/", "").split("/").filter(Boolean)
  );

  const dsaParams = DSA_DATA.map(doc =>
    doc.docs.replace("/docs/", "").split("/").filter(Boolean)
  );

  const networkingParams = NETWORKING_DATA.flatMap(module => {
    const moduleSlug = module.docs
      .replace("/docs/", "")
      .split("/")
      .filter(Boolean);

    const topicSlugs = module.topics.map(topic => [...moduleSlug, topic.slug]);

    return [moduleSlug, ...topicSlugs];
  });

  return [...playbookParams, ...dsaParams, ...networkingParams].map(slug => ({
    slug
  }));
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
  if (!slug?.length) {
    return path.join(DOCS_PATH, "index.mdx");
  }

  const dir = path.join(DOCS_PATH, ...slug);

  const indexFile = path.join(dir, "index.mdx");
  const mdxFile = `${dir}.mdx`;

  if (fs.existsSync(indexFile)) {
    return indexFile;
  }

  if (fs.existsSync(mdxFile)) {
    return mdxFile;
  }

  notFound();
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

  const type = slug[0] === "dsa" ? "dsa" : "playbook";

  const { next, prev } = lastSlug
    ? findNeighbour(type, lastSlug as string)
    : { next: undefined, prev: undefined };

  const source = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(source);

  return (
    <div className="flex w-full gap-8 overflow-x-auto">
      <DocsLayout>
        <article className="typeset animate-fade-in-blur typeset-docs mb-6 w-full min-w-0 wrap-break-word ease-out">
          {/* <article className="prose prose-neutral dark:prose-invert mb-6 max-w-none"> */}
          <div className="mt-12 mb-4 w-full">
            <div className="not-typeset flex w-full items-center justify-between gap-4 pr-2">
              <h2 className="font-inter animate-fade-in-blur text-2xl font-medium">
                {data.title}
              </h2>
              <div className="flex items-center gap-4">
                <ShareMenu
                  title={data.title}
                  url={`/docs/${type}/${lastSlug}`}
                />
                <NextSteps next={next} prev={prev} min />
              </div>
            </div>
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
                      theme: DEFAULT_CODE_THEME || "vesper",
                      keepBackground: false,
                      defaultLang: {
                        block: "plaintext",
                        inline: "plaintext"
                      }
                    }
                  ]
                ]
              }
            }}
          />
        </article>
        {(next || prev) && (
          <div className="border-edge border-t px-2 py-2 pt-4 pb-8">
            <NextSteps next={next} prev={prev} className="mt-3" />
          </div>
        )}
      </DocsLayout>
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
            {!min && (
              <span className="hidden sm:inline">
                {sliceContent(prev.title, 38)}
              </span>
            )}
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
              {!min && (
                <span className="hidden sm:inline">
                  {sliceContent(next.title, 38)}
                </span>
              )}
              <ArrowRightIcon className="size-4" />
            </div>
          </PrimaryButton>
        </div>
      )}
    </div>
  );
};
