"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  IconDailyDev,
  IconDiscord,
  IconGitHub,
  IconLinkedIn,
  type IconProps
} from "@/components/icons";
import { cn } from "@/lib/utils";
import { IconBrandX } from "@tabler/icons-react";
import { PrimaryButton } from "@/components/ui/primary-button";

import { Route } from "next";
import { uChatScrollButtonSound } from "@/sounds/chat-scroll";
import { useSound } from "@/hooks/use-sound";
import {
  DAILY_DEV_URL,
  DAILY_DEV_USERNAME,
  DISCORD_URL,
  DISCORD_USERNAME,
  GITHUB_URL,
  GITHUB_USERNAME,
  LINKEDIN_URL,
  LINKEDIN_USERNAME,
  X_URL,
  X_USERNAME
} from "@/lib/constants";
import Link from "next/link";

type SocialId = "x" | "github" | "linkedin" | "discord" | "dailydev";

type SocialItem = {
  id: SocialId;
  name: string;
  username: string;
  description: string;
  href: string;
  Icon: React.ComponentType<IconProps>;
};

const socials: SocialItem[] = [
  {
    id: "github",
    name: "GitHub",
    username: GITHUB_USERNAME,
    description: "Open source & developer tools.",
    href: GITHUB_URL,
    Icon: IconGitHub
  },
  {
    id: "x",
    name: "X",
    username: X_USERNAME,
    description: "Thoughts, ideas & things I build.",
    href: X_URL,
    Icon: IconBrandX
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    username: LINKEDIN_USERNAME,
    description: "Connect & grow professionally.",
    href: LINKEDIN_URL,
    Icon: IconLinkedIn
  },
  {
    id: "discord",
    name: "Discord",
    username: DISCORD_USERNAME,
    description: "Chat, build & connect.",
    href: DISCORD_URL,
    Icon: IconDiscord
  },
  {
    id: "dailydev",
    name: "daily.dev",
    username: DAILY_DEV_USERNAME,
    description: "My developer journey & interests.",
    href: DAILY_DEV_URL,
    Icon: IconDailyDev
  }
];

function SocialCard({
  social,
  open,
  onOpen,
  onClose
}: {
  social: SocialItem;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const { Icon } = social;
  const [chatScrollPlay] = useSound(uChatScrollButtonSound);

  return (
    <div className="relative z-50" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <PrimaryButton
        as="a"
        variant="outline"
        href={social.href as Route}
        onClick={() => chatScrollPlay()}
        target="_blank"
        className="group from-background to-muted primary-ring relative bg-linear-to-b px-1.5 py-1.5">
        <Icon className="text-muted-primary group-hover:text-primary size-6" />
      </PrimaryButton>

      <AnimatePresence>
        {open && (
          <Link href={social.href as Route} target="_blank">
            <motion.div
              initial={{
                opacity: 0,
                y: 8,
                scale: 0.96,
                filter: "blur(4px)"
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)"
              }}
              exit={{
                opacity: 0,
                y: 6,
                scale: 0.97,
                filter: "blur(3px)"
              }}
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 30,
                mass: 0.7
              }}
              className={cn(
                "absolute bottom-full left-1/2 z-60 mb-3 w-70",
                "-translate-x-1/2"
              )}>
              <div className="relative overflow-hidden rounded-xl border bg-neutral-200 p-3 backdrop-blur-xl dark:bg-neutral-900">
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <PrimaryButton
                      variant="outline"
                      className="from-background to-muted primary-ring relative bg-linear-to-b px-1.5 py-1.5">
                      <Icon className="text-muted-primary size-6" />
                    </PrimaryButton>

                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-medium">
                        {social.name}
                      </h3>

                      <p className="text-muted-foreground truncate text-xs">
                        {"@"}
                        {social.username}
                      </p>
                    </div>
                  </div>

                  <p className="text-muted-foreground mt-3 text-sm leading-5">
                    {social.description}
                  </p>
                </div>
              </div>

              <div className="absolute bottom-0 left-1/2 size-3 translate-x-[-50%] translate-y-[50%] rotate-45 border-r border-b bg-neutral-200 dark:bg-neutral-900" />
            </motion.div>
          </Link>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SocialHoverCards() {
  const [active, setActive] = useState<SocialId | null>(null);

  return (
    <div className="flex items-center gap-4">
      {socials.map(social => (
        <SocialCard
          key={social.id}
          social={social}
          open={active === social.id}
          onOpen={() => setActive(social.id)}
          onClose={() => setActive(null)}
        />
      ))}
    </div>
  );
}
