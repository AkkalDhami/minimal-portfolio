"use client";

import { Heading } from "@/components/ui/heading";
import { SubHeading } from "@/components/ui/sub-heading";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { DSA_DATA } from "@/data/dsa";

export function DsaSection() {
  return (
    <Section id="templates" className={cn("px-0")}>
      <div className="mb-4 px-4">
        <Heading>Data Structures & Algorithms</Heading>
        <SubHeading className="text-muted-foreground mx-0 max-w-2xl text-lg">
          A collection of data structures and algorithms implemented in c++.
        </SubHeading>
      </div>

      <div className="screen-line-before grid grid-cols-1">
        {DSA_DATA.map(t => (
          <div
            key={t.title}
            className="group animate-fade-in-blur flex flex-col gap-3">
            <a
              href={`${t.docs}`}
              className={cn(
                "group hover:bg-card-hover screen-line-before relative p-4 duration-300"
              )}>
              <h2 className="text-foreground font-noraml mb-2 text-lg underline-offset-4 group-hover:underline">
                {t.title}
              </h2>
              <p className="text-muted-secondary line-clamp-3">
                {t.description}
              </p>
            </a>
          </div>
        ))}
      </div>
    </Section>
  );
}
