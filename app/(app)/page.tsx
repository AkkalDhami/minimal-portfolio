import { ContactSection } from "@/components/contact/contact-section";
import { HeroSection } from "@/components/home/hero-section";
import { GitHubContributions } from "@/components/github";
import { ProjectsSection } from "@/components/projects/project-section";
import { SkillsSection } from "@/components/skills/skill-section";
import { PlaybookSection } from "@/components/playbook/playbook-section";
import { TemplateSection } from "@/components/templates/template-section";
import { StackMarquee } from "@/components/shared/stack-marquee";
import { Container } from "@/components/shared/container";

export default async function Page() {
  return (
    <Container className="border-edge space-y-2 border-x">
      <HeroSection />
      <GitHubContributions fetch={false} year={"2025"} />
      {/* <HeroSectionBackground /> */}
      <ProjectsSection home />

      <PlaybookSection home />

      <SkillsSection home />
      <TemplateSection home />
      <StackMarquee home />
      <GitHubContributions home={true} />
      <ContactSection home />
    </Container>
  );
}
