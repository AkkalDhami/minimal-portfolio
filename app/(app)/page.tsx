import { ContactSection } from "@/components/contact/contact-section";
import {
  HeroSection,
  HeroSectionBackground
} from "@/components/home/hero-section";
import { GitHubContributions } from "@/components/github";
import { ProjectsSection } from "@/components/projects/project-section";
import { SkillsSection } from "@/components/skills/skill-section";
import { PlaybookSection } from "@/components/playbook/playbook-section";
import { TemplateSection } from "@/components/templates/template-section";
import { StackMarquee } from "@/components/shared/stack-marquee";
export default async function Page() {
  return (
    <div className="border-edge mx-auto flex max-w-4xl flex-col space-y-2 border-x">
      <HeroSection />
      <GitHubContributions />
      <HeroSectionBackground />
      <ProjectsSection home />

      <PlaybookSection home />

      <SkillsSection home />
      <TemplateSection home />
      <StackMarquee home />
      <GitHubContributions home />
      <ContactSection home />
    </div>
  );
}
