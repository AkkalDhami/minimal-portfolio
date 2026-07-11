"use client";

import { Heading } from "@/components/ui/heading";
import { SubHeading } from "@/components/ui/sub-heading";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { NETWORKING_DATA } from "@/data/networking";
import { NetworkingModule } from "./networking-module";

export function NetworkingSection({ home = false }: { home?: boolean }) {
  return (
    <Section
      id="networking"
      className={cn("px-0", home && "screen-line-before")}>
      <div className="mb-6 px-4">
        <Heading>Computer Networking</Heading>

        <SubHeading className="text-muted-foreground mx-0 max-w-2xl text-lg">
          A comprehensive guide to computer networking, covering foundational
          concepts, protocols, network communication, and real-world
          applications.
        </SubHeading>
      </div>

      <div
        className={cn(
          "screen-line-after screen-line-before",
          "divide-edge divide-y"
        )}>
        {NETWORKING_DATA.map(module => (
          <NetworkingModule key={module.slug} module={module} />
        ))}
      </div>
    </Section>
  );
}
