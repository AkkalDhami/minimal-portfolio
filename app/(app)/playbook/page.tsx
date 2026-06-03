import { PlaybookSection } from "@/components/playbook/playbook-section";
import { Container } from "@/components/shared/container";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playbook",
  description:
    "Explore our comprehensive playbook, featuring best practices, strategies, and guidelines to help you excel in your projects and initiatives."
};

export default function Page() {
  return (
    <Container className={cn("border-edge border-x pt-16")}>
      <PlaybookSection />
    </Container>
  );
}
