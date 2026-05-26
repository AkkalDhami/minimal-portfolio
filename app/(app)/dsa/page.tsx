import { Metadata } from "next";
import { DsaSection } from "@/components/dsa/dsa-section";

export const metadata: Metadata = {
  title: "Data Structures & Algorithms",
  description:
    "A collection of data structures and algorithms implemented in c++."
};

export default function Page() {
  return (
    <div className="border-edge mx-auto max-w-4xl border-x pt-16">
      <DsaSection />
    </div>
  );
}
