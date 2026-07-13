"use client";

import {
  RiBookOpenLine,
  RiHome4Line,
  RiPhoneLine,
  RiGithubFill,
  RiCodeSSlashLine
} from "react-icons/ri";
import { HiOutlineCube } from "react-icons/hi";
import { LiaLaptopCodeSolid } from "react-icons/lia";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { LuLayoutTemplate } from "react-icons/lu";
import { Fragment, useEffect, useState } from "react";
import {
  Command,
  CommandCollection,
  CommandDialog,
  CommandDialogPopup,
  CommandDialogTrigger,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandPanel,
  CommandSeparator
} from "@/components/ui/command";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { IconType } from "react-icons";
import { useRouter } from "next/navigation";
import { Route } from "next";
import { PROJECTS } from "@/data/projects";
import { PLAYBOOK_DATA } from "@/data/playbook";
import { CONTACT_INFO } from "@/components/contact/contact-info";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { GITHUB_URL } from "@/lib/constants";
import { LuMoonStar } from "react-icons/lu";
import { useTheme } from "next-themes";
import { TEMPLATE_DATA } from "@/components/templates/template-section";
import { socialLinks } from "./social-link";
import { useSound } from "@/hooks/use-sound";
import { click005Sound } from "@/sounds/click-005";
import { click002Sound } from "@/sounds/click-002";
import { uChatScrollButtonSound } from "@/sounds/chat-scroll";
import { DSA_DATA } from "@/data/dsa";

export interface Item {
  value: string;
  label: string;
  icon: IconType | string;
  link?: boolean;
  newTab?: boolean;
  key?: string;
}

export interface Group {
  value: string;
  items: Item[];
}

export const navigations: Item[] = [
  {
    icon: RiHome4Line,
    label: "Home",
    value: "/",
    link: true,
    key: "h"
  },
  {
    icon: HiOutlineCube,
    label: "Projects",
    value: "/projects",
    link: true,
    key: "p"
  },
  {
    icon: HiOutlineSquare3Stack3D,
    label: "Tech Skills",
    value: "/#skills",
    link: true,
    key: "e"
  },
  {
    icon: LiaLaptopCodeSolid,
    label: "Development Setup",
    value: "/dev-setup",
    link: true,
    key: "s"
  },
  {
    icon: RiBookOpenLine,
    label: "PlayBook",
    value: "/playbook",
    link: true,
    key: "p"
  },
  {
    icon: LuLayoutTemplate,
    label: "Templates",
    value: "/templates",
    link: true,
    key: "t"
  },
  {
    icon: RiPhoneLine,
    label: "Contacts",
    value: "/contacts",
    link: true,
    key: "c"
  },
  {
    icon: RiCodeSSlashLine,
    label: "DSA",
    value: "/dsa",
    link: true,
    key: "a"
  }
];
export const projects: Item[] = PROJECTS.map(proj => {
  return {
    value: `/projects/${proj.slug}`,
    label: proj.title,
    icon: HiOutlineCube,
    link: true,
    newTab: false
  };
});

export const playbooks: Item[] = PLAYBOOK_DATA.map(play => {
  return {
    value: `${play.docs}`,
    label: play.title,
    icon: RiBookOpenLine,
    link: true,
    newTab: true
  };
});

export const dsa: Item[] = DSA_DATA.map(play => {
  return {
    value: `${play.docs}`,
    label: play.title,
    icon: RiBookOpenLine,
    link: true,
    newTab: true
  };
});

export const templates: Item[] = TEMPLATE_DATA.map(t => {
  return {
    value: `${t.liveUrl}`,
    label: t.title,
    icon: LuLayoutTemplate,
    link: true,
    newTab: true
  };
});

export const contacts: Item[] = CONTACT_INFO.filter(
  f => f.label.toLowerCase() != "github"
).map(c => {
  return {
    value: c.value,
    label: `${c.label}: ${c.value}`,
    icon: c.icon,
    link: false
  };
});

export const socials: Item[] = socialLinks.map(s => {
  return {
    value: s.href,
    label: `${s.name}`,
    icon: s.icon,
    link: true,
    newTab: true,
    key: s.key
  };
});

export const others: Item[] = [
  {
    icon: RiGithubFill,
    label: "Source Code",
    value: `${GITHUB_URL}/minimal-portfolio`,
    link: true,
    newTab: true,
    key: "y"
  },
  {
    icon: LuMoonStar,
    label: "Toggle Theme",
    value: `Toggle Theme`,
    link: false,
    key: "d"
  }
];

export const groupedItems: Group[] = [
  { items: navigations, value: "NAVIGATION" },
  { items: projects, value: "PROJECTS" },
  { items: playbooks, value: "BACKEND PLAYBOOK" },
  { items: dsa, value: "DATA STRUCTURES & ALGORITHMS" },
  { items: templates, value: "TEMPLATES" },
  { items: contacts, value: "CONTACT INFO" },
  { items: socials, value: "SOCIAL LINKS" },
  { items: others, value: "OTHERS" }
];

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [play] = useSound(click005Sound);
  const [themePlay] = useSound(click002Sound);
  const [chatScrollPlay] = useSound(uChatScrollButtonSound);

  const { systemTheme, theme, setTheme } = useTheme();

  function handleItemClick(_item: Item) {
    if (_item?.link && _item.newTab) {
      chatScrollPlay();
      return window.open(_item.value, "_blank");
    }

    if (_item.value.toLowerCase() === "toggle theme") {
      const currentTheme = theme === "system" ? systemTheme : theme;
      const isDark = currentTheme === "dark";

      setTheme(isDark ? "light" : "dark");
      themePlay();
      return;
    }

    if (_item?.link) {
      chatScrollPlay();
      router.push(_item.value as Route);
      setOpen(false);
    }
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
        play();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [play]);

  return (
    <CommandDialog onOpenChange={setOpen} open={open}>
      <CommandDialogTrigger
        nativeButton={true}
        render={
          <button
            onClick={() => play()}
            className="primary-ring active:scale-0.8 relative cursor-pointer rounded-full border px-3 py-1 transition-colors">
            <KbdGroup>
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
          </button>
        }></CommandDialogTrigger>
      <CommandDialogPopup
        className={
          "group primary-ring rounded-primary relative border dark:bg-neutral-950"
        }>
        <Command items={groupedItems}>
          <CommandInput
            placeholder="Search for apps and commands..."
            className={"py-0"}
          />
          <CommandPanel>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandList>
              {(group: Group) => (
                <Fragment key={group.value}>
                  <CommandGroup items={group.items}>
                    <CommandGroupLabel>{group.value}</CommandGroupLabel>
                    <CommandCollection>
                      {(item: Item) => {
                        const image = typeof item.icon === "string";
                        return (
                          <CommandItem
                            key={item.value}
                            onClick={() => handleItemClick(item)}
                            value={item.value}
                            className={
                              "ml-2 flex items-center justify-between px-2.5 py-2"
                            }>
                            <div className="flex items-center gap-2">
                              {image ? (
                                <Image
                                  src={item.icon as string}
                                  alt={item.label}
                                  width={16}
                                  height={16}
                                  className={cn(
                                    "text-muted-primary group-hover:text-accent-foreground size-6",
                                    item.label.toLocaleLowerCase() ===
                                      "email" && "dark:invert"
                                  )}
                                />
                              ) : (
                                <item.icon className="primary-ring border-edge size-6 rounded-md border p-1" />
                              )}

                              <span className="line-clamp-1 flex-1">
                                {item.label}
                              </span>
                            </div>
                            {item.key && (
                              <KbdGroup>
                                <Kbd>{item?.key}</Kbd>
                              </KbdGroup>
                            )}
                          </CommandItem>
                        );
                      }}
                    </CommandCollection>
                  </CommandGroup>
                  <CommandSeparator />
                </Fragment>
              )}
            </CommandList>
          </CommandPanel>
        </Command>
      </CommandDialogPopup>
    </CommandDialog>
  );
}
