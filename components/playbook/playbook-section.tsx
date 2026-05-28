"use client";

import { Heading } from "@/components/ui/heading";
import { SubHeading } from "@/components/ui/sub-heading";
import { PLAYBOOK_DATA } from "@/data/playbook";
import { PlaybookCard } from "./playbook-card";
import { IPlaybook } from "@/types/app.types";
import { cn } from "@/lib/utils";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Section } from "@/components/ui/section";

export function PlaybookSection({ home = false }: { home?: boolean }) {
  return (
    <Section
      id="playbook"
      className={cn(
        "px-0",
        home
          ? "screen-line-before"
          : "bg-[radial-gradient(35%_128px_at_0%_0%,--theme(--color-foreground/.05),transparent)] dark:bg-[radial-gradient(35%_128px_at_0%_0%,--theme(--color-foreground/.08),transparent),radial-gradient(35%_128px_at_100%_0%,--theme(--color-foreground/.08),transparent)]"
      )}>
      <div className="mb-8 px-4">
        <Heading>Backend Playbook</Heading>
        <SubHeading className="text-muted-foreground mx-0 max-w-2xl text-lg">
          Notes from building backend systems with Node.js and TypeScript.
        </SubHeading>
      </div>

      <div
        className={cn(
          "screen-line-after divide-edge grid",
          home && "divide-x sm:grid-cols-2"
        )}>
        {(home ? PLAYBOOK_DATA.slice(0, 4) : PLAYBOOK_DATA).map(
          (playbook: IPlaybook) => (
            <PlaybookCard data={playbook} key={playbook.slug} />
          )
        )}
      </div>

      {home && (
        <div className="mt-2 mb-2 flex items-center justify-center">
          <PrimaryButton
            as="a"
            variant="secondary"
            href={"/playbook"}
            className="py-3">
            View More
          </PrimaryButton>
        </div>
      )}
    </Section>
  );
}
