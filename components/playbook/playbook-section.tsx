"use client";

import { useMemo, useState } from "react";

import { Heading } from "@/components/ui/heading";
import { SubHeading } from "@/components/ui/sub-heading";
import { PLAYBOOK_DATA } from "@/data/playbook";
import { PlaybookCard } from "./playbook-card";
import { IPlaybook } from "@/types/app.types";
import { cn } from "@/lib/utils";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Section } from "@/components/ui/section";
import { Input } from "@/components/ui/input";
import { IconSearch } from "@tabler/icons-react";

export function PlaybookSection({ home = false }: { home?: boolean }) {
  const [search, setSearch] = useState("");

  const playbooks = home ? PLAYBOOK_DATA.slice(0, 10) : PLAYBOOK_DATA;

  const filteredPlaybooks = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return playbooks;

    return playbooks.filter((playbook: IPlaybook) => {
      return (
        playbook.title.toLowerCase().includes(query) ||
        playbook.description.toLowerCase().includes(query) ||
        playbook.slug.toLowerCase().includes(query) ||
        playbook.docs.toLowerCase().includes(query)
      );
    });
  }, [search, playbooks]);

  return (
    <Section id="playbook" className={cn("px-0", home && "screen-line-before")}>
      <div className="mb-6 px-4">
        <Heading>Backend Playbook</Heading>

        <SubHeading className="text-muted-foreground mx-0 max-w-2xl text-lg">
          Notes from building backend systems with Node.js and TypeScript.
        </SubHeading>

        {!home && (
          <div className="animate-fade-in-blur relative mt-4">
            <IconSearch className="text-muted-foreground absolute top-1/2 left-2 size-4 -translate-y-1/2" />

            <Input
              placeholder="Search playbooks..."
              className="pl-8"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        )}
      </div>

      <div
        className={cn(
          "screen-line-after divide-edge grid",
          home && "divide-x sm:grid-cols-2"
        )}>
        {filteredPlaybooks.length > 0 ? (
          filteredPlaybooks.map((playbook: IPlaybook) => (
            <PlaybookCard data={playbook} key={playbook.slug} />
          ))
        ) : (
          <div className="col-span-full px-4 py-10 text-center">
            <p className="text-muted-foreground">No playbooks found.</p>
          </div>
        )}
      </div>

      {home && (
        <div className="animate-fade-in-blur mt-2 flex items-center justify-center pb-2">
          <PrimaryButton
            as="a"
            variant="outline"
            href="/playbook"
            className="py-3">
            View More
          </PrimaryButton>
        </div>
      )}
    </Section>
  );
}
