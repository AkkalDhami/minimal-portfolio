"use client";

import { getDocsItems } from "@/lib/source";
import { LineNav } from "@/components/ui/line-nav";
import { usePathname } from "next/navigation";
import { useSound } from "@/hooks/use-sound";
import { cardSlide5Sound } from "@/sounds/card-slide-5";
import Link from "next/link";
import { NETWORKING_DATA } from "@/data/networking";
import { Route } from "next";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SQL_DATA } from "@/data/sql";
import { buttonVariants } from "@/components/ui/button";
import { sliceContent } from "@/utils/slice-content";

const title = {
  dsa: "DSA",
  playbook: "Playbook",
  networking: "Computer Networking",
  sql: "SQL - MySQL",
  "system-design": "System Design"
};

export function DocsSidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  const [play] = useSound(cardSlide5Sound);

  const isDsa = pathname.includes("/docs/dsa");
  const isPlaybook = pathname.includes("/docs/playbook");
  const isNetworking = pathname.includes("/docs/networking");
  const isSql = pathname.includes("/docs/sql");
  const isSystemDesign = pathname.includes("/docs/system-design");

  const items = getDocsItems(
    isDsa
      ? "dsa"
      : isPlaybook
        ? "playbook"
        : isNetworking
          ? "networking"
          : isSystemDesign
            ? "system-design"
            : "sql"
  );

  const slug = isNetworking
    ? pathname.split("/docs/networking/")[1]
    : pathname.split("/docs/sql/")[1];

  const moduleSlug = slug?.split("/")[0];

  const filteredModules = (isNetworking ? NETWORKING_DATA : SQL_DATA || []).map(
    m => ({
      title: m.title,
      href: `${m.docs}`,
      topics: m.topics.map(t => ({
        title: sliceContent(`${t.order}. ${t.title}`, 32),
        href: `${m.docs}${t.docs}`
      }))
    })
  );

  return (
    <aside
      className={cn(
        "primary-ring not-typeset bg-background fixed top-26 left-1.5 z-40 h-full w-74 space-y-2 rounded-lg border p-2",
        className
      )}>
      <h2 className="font-inter text-lg font-medium">
        {
          title[
            isDsa
              ? "dsa"
              : isPlaybook
                ? "playbook"
                : isNetworking
                  ? "networking"
                  : isSystemDesign
                    ? "system-design"
                    : "sql"
          ]
        }
      </h2>

      <ScrollArea
        className={"scroll-fade relative h-full max-h-140 pb-12 xl:max-h-126"}>
        {moduleSlug?.trim() ? (
          <>
            {filteredModules?.map((m, i) => (
              <div key={i}>
                <Link
                  href={m.href as Route}
                  onClick={() => play()}
                  className={cn(
                    "font-inter hover:text-primary font-medium underline-offset-2 hover:underline",
                    pathname === m.href
                      ? "text-primary underline"
                      : "text-muted-foreground"
                  )}>
                  {m.title}
                </Link>
                <LineNav
                  activeHref={pathname}
                  items={m.topics}
                  onItemClick={() => play()}
                />
              </div>
            ))}
          </>
        ) : (
          <LineNav
            activeHref={pathname}
            items={items}
            onItemClick={() => play()}
          />
        )}
        {isSql && (
          <Link
            target="_blank"
            href={"/playground/sql"}
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "sm"
              }),
              "absolute bottom-2 z-30 w-full font-normal"
            )}>
            MySQL Playground
          </Link>
        )}
      </ScrollArea>
    </aside>
  );
}
