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
    title: "Minimalistic Portfolio",
    description:
      "A modern portfolio showcasing scalable web applications, clean UI, and developer-focused solutions.",
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
    title: "Redesigned Landing Page",
    description:
      "A redesigned landing page for sambad.io featuring a clean, responsive, and user-focused experience.",
    thumbnail: "/assets/templates/temp-7.png",
    githubUrl: `${GITHUB_URL}/sambad-landing-page`,
    liveUrl: "https://sambaad.vercel.app",
    technologies: [
      { name: "Nextjs" },
      { name: "React" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "Motion" },
      { name: "Shadcn" }
    ]
  },

  {
    title: "Minimal Developer Portfolio",
    description:
      "A sleek developer portfolio with modern UI, subtle animations, and responsive design.",
    thumbnail: "/assets/templates/temp-1.png",
    githubUrl: `${GITHUB_URL}/akkal-dhami`,
    liveUrl: "https://akkal.vercel.app",
    technologies: [
      { name: "Nextjs" },
      { name: "React" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "Shadcn" },
      { name: "Motion" }
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
      { name: "Motion" },
      { name: "Shadcn" }
    ]
  },
  {
    title: "Retro-Inspired Portfolio",
    description:
      "A retro-inspired portfolio for developers to showcase their work.",
    thumbnail: "/assets/templates/temp-6.png",
    githubUrl: `${GITHUB_URL}/8bit-portfolio-template`,
    liveUrl: "https://8bit-portfolio-template.vercel.app",
    technologies: [
      { name: "Nextjs" },
      { name: "React" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "Shadcn" },
      { name: "Motion" }
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
  },
  {
    title: "Personal Developer Portfolio",
    description:
      "A modern portfolio website built to showcase projects, experience, skills, and technical expertise with a clean and minimal design.",
    thumbnail: "/assets/templates/temp-3.png",
    githubUrl: `${GITHUB_URL}/designer-minimal-portfolio`,
    liveUrl: "https://designer-minimal-portfolio.vercel.app",
    technologies: [
      { name: "Nextjs" },
      { name: "React" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "Shadcn" },
      { name: "Motion" }
    ]
  }
];

export function TemplateSection({ home = false }: { home?: boolean }) {
  const hasShowMore = TEMPLATE_DATA.length > 8;

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

      <div className="divide-edge screen-line-before grid grid-cols-1 divide-x sm:grid-cols-2">
        {(home ? TEMPLATE_DATA.slice(0, 8) : TEMPLATE_DATA).map(t => (
          <div key={t.githubUrl} className="group">
            <TemplateCard template={t} />
          </div>
        ))}
      </div>

      {hasShowMore && (
        <div className="flex items-center justify-center py-3">
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
