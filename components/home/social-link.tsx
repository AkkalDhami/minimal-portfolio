import {
  DAILY_DEV_URL,
  DISCORD_URL,
  GITHUB_URL,
  LINKEDIN_URL,
  X_URL
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import { LuArrowUpRight } from "react-icons/lu";
import { SiDailydotdev } from "react-icons/si";
import { PrimaryButton } from "@/components/ui/primary-button";
import { Route } from "next";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

import {
  RiLinkedinFill,
  RiGithubFill,
  RiTwitterXFill,
  RiDiscordFill
} from "react-icons/ri";
import { IconType } from "react-icons";
import { uChatScrollButtonSound } from "@/sounds/chat-scroll";
import { useSound } from "@/hooks/use-sound";

export type SocialLink = {
  name: string;
  key?: string;
  href: string;
  icon: IconType;
};

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    href: GITHUB_URL,
    icon: RiGithubFill,
    key: "g"
  },
  {
    name: "X (Twitter)",
    href: X_URL,
    icon: RiTwitterXFill,
    key: "x"
  },
  {
    name: "Discord",
    href: DISCORD_URL,
    icon: RiDiscordFill,
    key: "i"
  },
  {
    name: "LinkedIn",
    href: LINKEDIN_URL,
    icon: RiLinkedinFill,
    key: "l"
  },
  {
    name: "daily.dev",
    href: DAILY_DEV_URL,
    icon: SiDailydotdev,
    key: "z"
  }
];

export function SocialLinks({
  minimal = false,
  className
}: {
  minimal?: boolean;
  className?: string;
}) {
  const [chatScrollPlay] = useSound(uChatScrollButtonSound);

  if (minimal) {
    return (
      <div className={cn("flex items-center gap-4", className)}>
        {socialLinks.map(link => (
          <TooltipProvider key={link.name}>
            <Tooltip>
              <TooltipTrigger
                render={
                  <PrimaryButton
                    as="a"
                    variant="outline"
                    href={link.href as Route}
                    onClick={() => chatScrollPlay()}
                    target="_blank"
                    className="group from-background to-muted primary-ring relative bg-linear-to-b px-1.5 py-1.5">
                    <link.icon className="text-muted-primary group-hover:text-primary size-6" />
                  </PrimaryButton>
                }></TooltipTrigger>
              <TooltipContent>
                <p>{link.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-2 gap-4 md:grid-cols-4", className)}>
      {socialLinks.map(social => (
        <a
          key={social.name}
          href={social.href}
          onClick={() => chatScrollPlay()}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:bg-card-hover primary-ring group primary-border rounded-primary relative flex w-full items-center gap-3 border-[1.5px] p-1.75 text-center">
          <div className="rounded-primary from-background to-muted primary-ring relative bg-linear-to-b p-1.5">
            <social.icon className="text-muted-foreground group-hover:text-primary size-5 sm:size-6" />
            <div className="corner-squircle rounded-primary supports-corner-shape:rounded-primary pointer-events-none absolute inset-0 ring-1 ring-black/10 ring-inset dark:ring-white/15"></div>
          </div>
          <div className="flex w-full flex-col items-start">
            <div className="flex w-full items-center justify-between">
              <h3 className="text-muted-primary group-hover:text-accent-foreground text-sm font-medium underline-offset-3 group-hover:underline sm:text-base">
                {social.name}
              </h3>
              <LuArrowUpRight className="text-muted-primary group-hover:text-accent-foreground size-4" />
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
