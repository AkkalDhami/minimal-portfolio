"use client";

import { useMemo, useState } from "react";
import { Heading } from "@/components/ui/heading";
import { SubHeading } from "@/components/ui/sub-heading";
import { IModule } from "@/types/app.types";
import { cn } from "@/lib/utils";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Section } from "@/components/ui/section";
import { Input } from "@/components/ui/input";
import { IconSearch, IconX } from "@tabler/icons-react";
import { SYSTEM_DESIGN_DATA } from "@/data/system-design";
import { NetworkingModule } from "@/components/networking/networking-module";

export function SystemDesignSection({ home = false }: { home?: boolean }) {
  const [search, setSearch] = useState("");

  const limit = home ? 10 : 100;

  const systemDesigns = home
    ? SYSTEM_DESIGN_DATA.slice(0, limit)
    : SYSTEM_DESIGN_DATA;

  const filteredSystemDesigns = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return systemDesigns;

    return systemDesigns.filter((module: IModule) => {
      return (
        module.title.toLowerCase().includes(query) ||
        module.description.toLowerCase().includes(query) ||
        module.slug.toLowerCase().includes(query) ||
        module.docs.toLowerCase().includes(query) ||
        module.topics.some(topic =>
          topic.title.toLowerCase().includes(query)
        ) ||
        module.topics.some(topic =>
          topic.description.toLowerCase().includes(query)
        )
      );
    });
  }, [search, systemDesigns]);

  return (
    <Section
      id="system-design"
      className={cn("px-0", home && "screen-line-before")}>
      <div className="mb-4 px-4">
        <Heading>System Design</Heading>

        <SubHeading className="text-muted-foreground mx-0 max-w-2xl text-lg">
          Learn system design principles and best practices for building
          scalable and maintainable applications.
        </SubHeading>

        {!home && (
          <div className="animate-fade-in-blur relative mt-4">
            <IconSearch className="text-muted-foreground absolute top-1/2 left-2 size-4 -translate-y-1/2" />

            <Input
              placeholder="Search system designs..."
              className="px-8"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />

            <button
              disabled={!search?.trim()?.length}
              onClick={() => setSearch("")}
              className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2">
              <IconX className="size-4" />
            </button>
          </div>
        )}
      </div>

      <div
        className={cn(
          "screen-line-after screen-line-before",
          "divide-edge divide-y"
        )}>
        {filteredSystemDesigns.map(module => (
          <NetworkingModule key={module.slug} module={module} />
        ))}
      </div>

      {/* <div
        className={cn(
          "screen-line-after divide-edge grid"
          // "sm:grid-cols-2 sm:divide-x"
        )}>
        {filteredSystemDesigns.length > 0 ? (
          filteredSystemDesigns.map((playbook: IPlaybook) => (
            <PlaybookCard data={playbook} key={playbook.slug} />
          ))
        ) : (
          <div className="col-span-full px-4 py-10 text-center">
            <p className="text-muted-foreground">No system designs found.</p>
          </div>
        )}
      </div> */}

      {home && limit > 10 && (
        <div className="animate-fade-in-blur mt-2 flex items-center justify-center pb-2">
          <PrimaryButton
            as="a"
            variant="outline"
            href="/system-design"
            className="py-3">
            View More
          </PrimaryButton>
        </div>
      )}
    </Section>
  );
}
