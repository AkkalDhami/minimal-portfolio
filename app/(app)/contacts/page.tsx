import { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { ContactSection } from "@/components/contact/contact-section";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Akkal Dhami for collaborations, inquiries, or just to say hi."
};

export default function Page() {
  return (
    <Container className="border-edge border-x pt-16">
      <ContactSection />
    </Container>
  );
}
