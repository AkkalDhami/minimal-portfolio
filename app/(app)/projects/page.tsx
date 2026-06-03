import { Metadata } from "next";
import { ProjectsSection } from "@/components/projects/project-section";
import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/container";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A showcase of my recent work in web development, from full-stack applications to component registries."
};

export default function Page() {
  return (
    <Container className={cn("border-edge border-x pt-16")}>
      <ProjectsSection details={false} />
    </Container>
  );
}
