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
import { IconMenu } from "@tabler/icons-react";
import { motion } from "motion/react";
import { useState } from "react";
import { uChatScrollButtonSound } from "@/sounds/chat-scroll";
import { SYSTEM_DESIGN_DATA } from "@/data/system-design";

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
  const [playChatScrollButton] = useSound(uChatScrollButtonSound);
  const [isOpen, setIsOpen] = useState(true);

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
    : isSystemDesign
      ? pathname.split("/docs/system-design/")[1]
      : pathname.split("/docs/sql/")[1];

  const moduleSlug = slug?.split("/")[0];

  const filteredModules = (
    isNetworking
      ? NETWORKING_DATA
      : isSystemDesign
        ? SYSTEM_DESIGN_DATA
        : SQL_DATA || []
  ).map(m => ({
    title: m.title,
    href: `${m.docs}`,
    topics: m.topics.map(t => ({
      title: sliceContent(`${t.order}. ${t.title}`, 32),
      href: `${m.docs}${t.docs}`
    }))
  }));

  const totalModulesAndTopics = () => ({
    modules: filteredModules.length,
    topics: filteredModules.reduce((acc, m) => acc + m.topics.length, 0)
  });

  console.log(totalModulesAndTopics());

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          playChatScrollButton();
        }}
        className="text-muted-foreground hover:text-foreground hover:bg-muted fixed top-24 left-3 z-50 hidden size-8 cursor-pointer items-center justify-center rounded-md p-1.5 xl:flex">
        <IconMenu />
      </button>
      <motion.aside
        initial={{
          x: -200,
          opacity: 0
        }}
        animate={{
          x: isOpen ? 0 : -200,
          opacity: isOpen ? 1 : 0
        }}
        exit={{
          x: -200,
          opacity: 0
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
        className={cn(
          "primary-ring not-typeset bg-background fixed top-22 left-1.5 z-40 h-full w-74 space-y-2 rounded-lg border p-2",
          className
        )}>
        <h2 className="font-inter text-lg font-medium xl:pl-10">
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
          className={cn(
            "relative h-full max-h-140 xl:max-h-128",
            isSql && "pb-10",
            "scroll-fade-y"
          )}>
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
              onClick={() => play()}
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "sm"
                }),
                "absolute -bottom-2 z-30 w-full font-normal"
              )}>
              MySQL Playground
            </Link>
          )}
        </ScrollArea>
      </motion.aside>
    </>
  );
}
