import { Metadata } from "next";
import { DsaSection } from "@/components/dsa/dsa-section";
import { Container } from "@/components/shared/container";

export const metadata: Metadata = {
  title: "Data Structures & Algorithms",
  description:
    "A collection of data structures and algorithms implemented in c++."
};

export default function Page() {
  return (
    <Container className="border-edge border-x pt-16">
      <DsaSection />
    </Container>
  );
}
