import { SQLSection } from "@/components/sql/sql-section";
import { Container } from "@/components/shared/container";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SQL",
  description:
    "A comprehensive guide to SQL, covering foundational concepts, setup, and real-world applications."
};

export default function Page() {
  return (
    <Container className={cn("border-edge border-x pt-16")}>
      <SQLSection />
    </Container>
  );
}
