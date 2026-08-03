import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import { mdxComponents } from "@/components/docs/mdx-components";
import rehypePrettyCode from "rehype-pretty-code";
import { DEFAULT_CODE_THEME } from "@/lib/constants";
import { findNeighbour } from "@/lib/source";

import { PLAYBOOK_DATA } from "@/data/playbook";
import siteConfig from "@/lib/site";
import { ShareMenu } from "@/components/ui/share-menu";
import { NETWORKING_DATA } from "@/data/networking";
import { DSA_DATA } from "@/data/dsa";
import { SQL_DATA } from "@/data/sql";
import { DocsLayout } from "@/components/layouts/docs-layout";
import { SYSTEM_DESIGN_DATA } from "@/data/system-design";
import { NextSteps } from "@/components/docs/next-docs";
import { Metadata } from "next";

export const dynamic = "force-static";
export const dynamicParams = false;
export const revalidate = false;

const DOCS_PATH = path.join(process.cwd(), "docs");

export async function generateStaticParams() {
  const playbookParams = PLAYBOOK_DATA.map(doc =>
    doc.docs.replace("/docs/", "").split("/").filter(Boolean)
  );

  const systemDesignParams = SYSTEM_DESIGN_DATA.map(doc =>
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

  const sqlParams = SQL_DATA.flatMap(module => {
    const moduleSlug = module.docs
      .replace("/docs/", "")
      .split("/")
      .filter(Boolean);

    const topicSlugs = module.topics.map(topic => [...moduleSlug, topic.slug]);

    return [moduleSlug, ...topicSlugs];
  });

  return [
    ...systemDesignParams,
    ...playbookParams,
    ...dsaParams,
    ...networkingParams,
    ...sqlParams
  ].map(slug => ({
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

  const type =
    slug[0] === "system-design"
      ? "system-design"
      : slug[0] === "dsa"
        ? "dsa"
        : slug[0] === "sql"
          ? "sql"
          : "playbook";

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
            <div className="not-typeset flex w-full flex-wrap items-center justify-between gap-4 pr-2">
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
                      theme: {
                        dark: DEFAULT_CODE_THEME,
                        light: "github-light"
                      },
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
