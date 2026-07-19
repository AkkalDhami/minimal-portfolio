"use client";

import { Heading } from "@/components/ui/heading";
import { SubHeading } from "@/components/ui/sub-heading";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { NetworkingModule } from "@/components/networking/networking-module";
import { SQL_DATA } from "@/data/sql";

export function SQLSection({ home = false }: { home?: boolean }) {
  return (
    <Section
      id="sql"
      className={cn("not-typeset px-0", home && "screen-line-before")}>
      <div className="mb-6 px-4">
        <Heading>SQL - MySQL</Heading>

        <SubHeading className="text-muted-foreground mx-0 max-w-2xl text-lg">
          A comprehensive guide to SQL, covering foundational concepts, setup,
          and real-world applications.
        </SubHeading>
      </div>

      <div
        className={cn(
          "screen-line-after screen-line-before"
          // "divide-edge divide-y"
        )}>
        {SQL_DATA.map(module => (
          <NetworkingModule key={module.slug} module={module} />
        ))}
      </div>
    </Section>
  );
}
