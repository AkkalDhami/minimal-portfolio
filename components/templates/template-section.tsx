"use client";

import { Heading } from "@/components/ui/heading";
import { SubHeading } from "@/components/ui/sub-heading";
import { Project } from "@/data/projects";
import { TemplateCard } from "@/components/templates/template-card";
import { GITHUB_URL } from "@/lib/constants";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

export type ITemplate = Pick<
  Project,
  | "title"
  | "description"
  | "thumbnail"
  | "githubUrl"
  | "liveUrl"
  | "technologies"
>;

export const TEMPLATE_DATA: ITemplate[] = [
  {
    title: "Minimal Developer Portfolio",
    description:
      "A sleek developer portfolio with modern UI, subtle animations, and fully responsive layouts built for performance and clarity.",
    thumbnail: "/assets/templates/temp-1.png",
    githubUrl: `${GITHUB_URL}/akkal-dhami`,
    liveUrl: "https://akkaldhami.com.np",
    technologies: [
      { name: "Nextjs" },
      { name: "React" },
      { name: "TypeScript" },
      { name: "Tailwind" },
      { name: "Shadcn" }
    ]
  },
  {
    title: "Minimalistic Portfolio",
    description:
      "A modern clean minimal portfolio showcasing scalable web applications, developer tools, and reusable systems, with a focus on clean UI, performance, and developer experience.",
    thumbnail: "/images/og.png",
    githubUrl: `${GITHUB_URL}/minimal-portfolio`,
    liveUrl: "https://akkal.com.np",
    technologies: [
      { name: "Nextjs" },
      { name: "React" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "Shadcn" }
    ]
  },
  {
    title: "Clean Personal Portfolio",
    description:
      "A lightweight and elegant personal portfolio template focused on simplicity, speed, and intuitive design.",
    thumbnail: "/assets/templates/temp-2.png",
    githubUrl: `${GITHUB_URL}/minimal-portfolio-template`,
    liveUrl: "https://akkal-min-portfolio.vercel.app",
    technologies: [
      { name: "Nextjs" },
      { name: "React" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "Shadcn" }
    ]
  },
  {
    title: "Retro-Inspired Portfolio",
    description:
      "A unique and retro-inspired portfolio website designed for developers who want to showcase their work with a nostalgic touch.",
    thumbnail: "/assets/templates/temp-6.png",
    githubUrl: `${GITHUB_URL}/8bit-portfolio-template`,
    liveUrl: "https://8bit-portfolio-template.vercel.app",
    technologies: [
      { name: "Nextjs" },
      { name: "React" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "Shadcn" }
    ]
  },
  {
    title: "MERN Stack Portfolio",
    description:
      "A portfolio template built with the MERN stack, designed to showcase scalable projects and real-world applications.",
    thumbnail: "/assets/templates/temp-3.png",
    githubUrl: `${GITHUB_URL}/MERN-Portfolio`,
    liveUrl: "",
    technologies: [
      { name: "React" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "MongoDB" },
      { name: "Nodejs" },
      { name: "Expressjs" }
    ]
  },
  {
    title: "Terminal-Style Portfolio",
    description:
      "A unique terminal-inspired portfolio experience with interactive UI and a developer-focused aesthetic.",
    thumbnail: "/assets/templates/temp-5.png",
    githubUrl: `${GITHUB_URL}/terminal-portfolio`,
    liveUrl: "https://terminal-portfolio-akkal.vercel.app",
    technologies: [
      { name: "HTML" },
      { name: "CSS" },
      { name: "JavaScript" },
      { name: "Tailwind CSS" }
    ]
  },
  {
    title: "Classic Minimal Portfolio",
    description:
      "A modern yet classic portfolio template built with clean layouts, smooth interactions, and responsive design.",
    thumbnail: "/assets/templates/temp-4.png",
    githubUrl: `${GITHUB_URL}/Portfolio`,
    liveUrl: "https://akkal2.vercel.app",
    technologies: [
      { name: "HTML" },
      { name: "CSS" },
      { name: "JavaScript" },
      { name: "Tailwind CSS" }
    ]
  }
];

export function TemplateSection({ home = false }: { home?: boolean }) {
  return (
    <Section
      id="templates"
      className={cn("px-0", home && "screen-line-before")}>
      <div className="mb-4 px-4">
        <Heading>Templates</Heading>
        <SubHeading className="text-muted-foreground mx-0 max-w-2xl text-lg">
          A curated collection of beautiful portfolio templates and modern
          landing pages crafted for performance and design.
        </SubHeading>
      </div>

      <div className="divide-edge screen-line-before grid grid-cols-1 divide-x">
        {(home ? TEMPLATE_DATA.slice(0, 4) : TEMPLATE_DATA).map(t => (
          <div key={t.githubUrl} className="group">
            <TemplateCard template={t} />
          </div>
        ))}
      </div>

      {home && (
        <div className="my-2 flex items-center justify-center">
          <PrimaryButton
            as="a"
            variant="outline"
            href={"/templates"}
            className="py-3">
            View More
          </PrimaryButton>
        </div>
      )}
    </Section>
  );
}
