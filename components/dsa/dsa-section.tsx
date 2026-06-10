"use client";

import { Heading } from "@/components/ui/heading";
import { SubHeading } from "@/components/ui/sub-heading";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { DSA_DATA, IDSA } from "@/data/dsa";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { IconSearch } from "@tabler/icons-react";

export function DsaSection({ home = false }: { home?: boolean }) {
  const [search, setSearch] = useState("");

  const data = home ? DSA_DATA.slice(0, 10) : DSA_DATA;

  const filteredData = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return data;

    return data.filter((d: IDSA) => {
      return (
        d.title.toLowerCase().includes(query) ||
        d.description.toLowerCase().includes(query) ||
        d.slug.toLowerCase().includes(query) ||
        d.docs.toLowerCase().includes(query)
      );
    });
  }, [search, data]);
  return (
    <Section id="templates" className={cn("px-0")}>
      <div className="mb-4 px-4">
        <Heading>Data Structures & Algorithms</Heading>
        <SubHeading className="text-muted-foreground mx-0 max-w-2xl text-lg">
          A collection of data structures and algorithms implemented in c++.
        </SubHeading>
        {!home && (
          <div className="animate-fade-in-blur relative mt-4">
            <IconSearch className="text-muted-foreground absolute top-1/2 left-2 size-4 -translate-y-1/2" />

            <Input
              placeholder="Search here..."
              className="pl-8"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="screen-line-before grid grid-cols-1">
        {filteredData.map(t => (
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
