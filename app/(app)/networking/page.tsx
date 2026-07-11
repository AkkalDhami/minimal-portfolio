import { NetworkingSection } from "@/components/networking/networking-section";
import { Container } from "@/components/shared/container";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Computer Networking",
  description:
    "A comprehensive guide to computer networking, covering foundational concepts, protocols, devices, network communication, troubleshooting, and real-world applications."
};

export default function Page() {
  return (
    <Container className={cn("border-edge border-x pt-16")}>
      <NetworkingSection />
    </Container>
  );
}
