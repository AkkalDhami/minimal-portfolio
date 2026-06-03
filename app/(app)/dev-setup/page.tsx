import { Metadata } from "next";
import { SetupSection } from "@/components/setup/setup-section";
import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/container";

export const metadata: Metadata = {
  title: "Development Setup",
  description:
    "A detailed look at my development environment, including my IDE setup, themes, fonts, and tools."
};

export default function Page() {
  return (
    <Container className={cn("border-edge border-x pt-16")}>
      <SetupSection />
    </Container>
  );
}
