import { Metadata } from "next";
import { TemplateSection } from "@/components/templates/template-section";
import { Container } from "@/components/shared/container";

export const metadata: Metadata = {
  title: "Templates",
  description:
    "A curated collection of beautiful portfolio templates and modern landing pages crafted for performance and design."
};

export default function Page() {
  return (
    <Container className="border-edge border-x pt-16">
      <TemplateSection />
    </Container>
  );
}
