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

const title = {
  dsa: "DSA",
  playbook: "Playbook",
  networking: "Computer Networking"
};

export function DocsSidebar() {
  const pathname = usePathname();

  const [play] = useSound(cardSlide5Sound);

  const isDsa = pathname.includes("/docs/dsa");
  const isPlaybook = pathname.includes("/docs/playbook");
  const isNetworking = pathname.includes("/docs/networking");

  const items = getDocsItems(
    isDsa ? "dsa" : isPlaybook ? "playbook" : "networking"
  );

  const slug = isNetworking ? pathname.split("/docs/networking/")[1] : "";

  const moduleSlug = slug?.split("/")[0];

  const filteredModules = NETWORKING_DATA?.map(m => ({
    title: m.title,
    href: `${m.docs}`,
    topics: m.topics.map(t => ({
      title: `${t.order}. ${t.title}`,
      href: `${m.docs}${t.docs}`
    }))
  }));

  return (
    <aside className="primary-ring not-typeset bg-background fixed top-26 left-1.5 z-40 hidden h-full w-74 space-y-2 rounded-lg border p-2 lg:block">
      <h2 className="font-inter text-lg font-medium">
        {title[isDsa ? "dsa" : isPlaybook ? "playbook" : "networking"]}
      </h2>

      <ScrollArea className={"scroll-fade h-full max-h-120"}>
        {moduleSlug?.trim() ? (
          <>
            {filteredModules?.map((m, i) => (
              <div key={i}>
                <Link
                  href={m.href as Route}
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
      </ScrollArea>
    </aside>
  );
}
