"use client";

import { Heading } from "@/components/ui/heading";
import { SubHeading } from "@/components/ui/sub-heading";
import { PROJECTS } from "@/data/projects";
import { ProjectCard } from "@/components/projects/project-card";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short"
  });
};

export function ProjectsSection({
  details = false,
  home = false
}: {
  details?: boolean;
  home?: boolean;
}) {
  return (
    <Section
      id="projects"
      className={cn(
        home
          ? "screen-line-before"
          : "bg-[radial-gradient(35%_128px_at_0%_0%,--theme(--color-foreground/.05),transparent)] dark:bg-[radial-gradient(35%_128px_at_0%_0%,--theme(--color-foreground/.08),transparent),radial-gradient(35%_128px_at_100%_0%,--theme(--color-foreground/.08),transparent)]"
      )}>
      <div className="mb-4 px-4">
        <Heading> Featured Projects</Heading>
        <SubHeading className="text-muted-foreground mx-0 max-w-2xl text-lg">
          A collection of projects that showcase my skills in modern web
          development and problem-solving capabilities.
        </SubHeading>
      </div>

      <div className="screen-line-after grid grid-cols-1">
        {(home ? PROJECTS.slice(0, 4) : PROJECTS).map(project => (
          <div key={project.slug} className="group">
            <ProjectCard project={project} details={details} />
          </div>
        ))}
      </div>
    </Section>
  );
}
