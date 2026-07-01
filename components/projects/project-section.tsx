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
    <Section id="projects" className={cn(home && "screen-line-before")}>
      <div className="mb-4 px-4">
        <Heading> Featured Projects</Heading>
        <SubHeading className="text-muted-foreground mx-0 max-w-2xl text-lg">
          A collection of projects that showcase my skills in modern web
          development and problem-solving capabilities.
        </SubHeading>
      </div>

      <div className="screen-line-after divide-edge grid grid-cols-1 divide-x sm:grid-cols-2">
        {(home ? PROJECTS.slice(0, 4) : PROJECTS).map(project => (
          <div key={project.slug} className="group">
            <ProjectCard project={project} details={details} />
          </div>
        ))}
      </div>
    </Section>
  );
}
