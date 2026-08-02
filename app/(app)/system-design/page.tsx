import { Container } from "@/components/shared/container";
import { SystemDesignSection } from "@/components/system-design/system-design-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "System Design",
  description:
    "Learn about system design and get inspiration for your next project. Browse our collection of system design articles and system design designs for your next project."
};

export default function page() {
  return (
    <Container className="border-edge border-x pt-16">
      <SystemDesignSection />
    </Container>
  );
}
