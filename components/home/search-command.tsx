"use client";

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
import { useRouter } from "next/navigation";
import { Route } from "next";
import { PROJECTS } from "@/data/projects";
import { PLAYBOOK_DATA } from "@/data/playbook";
import { CONTACT_INFO } from "@/components/contact/contact-info";
import { GITHUB_URL } from "@/lib/constants";
import { useTheme } from "next-themes";
import { TEMPLATE_DATA } from "@/components/templates/template-section";
import { socialLinks } from "./social-link";
import { useSound } from "@/hooks/use-sound";
import { click005Sound } from "@/sounds/click-005";
import { click002Sound } from "@/sounds/click-002";
import { uChatScrollButtonSound } from "@/sounds/chat-scroll";
import { DSA_DATA } from "@/data/dsa";
import {
  IconBook,
  IconBrandGithub,
  IconCode,
  IconCube,
  IconDatabase,
  IconDeviceDesktopCode,
  IconHome,
  IconMoonStars,
  IconPhone,
  IconStack2,
  IconTemplate,
  IconWorld
} from "@tabler/icons-react";
import { NETWORKING_DATA } from "@/data/networking";
import { padString } from "@/utils/pad-string";
import { SQL_DATA } from "@/data/sql";
import { IconProps } from "@/components/icons";

export interface Item {
  value: string;
  label: string;
  icon: React.FC<IconProps>;
  link?: boolean;
  newTab?: boolean;
  key?: string;

  // children?: Omit<Item, "icon">[];
}

export interface Group {
  value: string;
  items: Item[];
}

export const navigations: Item[] = [
  {
    icon: IconHome,
    label: "Home",
    value: "/",
    link: true,
    key: "h"
  },
  {
    icon: IconCube,
    label: "Projects",
    value: "/projects",
    link: true,
    key: "p"
  },
  {
    icon: IconStack2,
    label: "Tech Skills",
    value: "/#skills",
    link: true,
    key: "e"
  },
  {
    icon: IconDeviceDesktopCode,
    label: "Development Setup",
    value: "/dev-setup",
    link: true,
    key: "s"
  },
  {
    icon: IconBook,
    label: "PlayBook",
    value: "/playbook",
    link: true,
    key: "p"
  },
  {
    icon: IconWorld,
    label: "Computer Networking",
    value: "/networking",
    link: true,
    key: "n"
  },
  {
    icon: IconDatabase,
    label: "SQL - MySQL",
    value: "/sql",
    link: true,
    key: "o"
  },
  {
    icon: IconTemplate,
    label: "Templates",
    value: "/templates",
    link: true,
    key: "t"
  },
  {
    icon: IconPhone,
    label: "Contacts",
    value: "/contacts",
    link: true,
    key: "c"
  },
  {
    icon: IconCode,
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
    icon: IconCube,
    link: true,
    newTab: false
  };
});

export const playbooks: Item[] = PLAYBOOK_DATA.map(play => {
  return {
    value: `${play.docs}`,
    label: play.title,
    icon: IconBook,
    link: true,
    newTab: true
  };
});

export const networking = NETWORKING_DATA.flatMap(net =>
  net.topics.map(topic => ({
    icon: IconWorld,
    value: `${net.docs}${topic.docs}`,
    label: `Module - ${padString(topic.module.toString(), 2, "0")}. ${topic.title}`,
    link: true
  }))
);

export const sql = SQL_DATA.flatMap(net =>
  net.topics.map(topic => ({
    icon: IconWorld,
    value: `${net.docs}${topic.docs}`,
    label: `Module - ${padString(topic.module.toString(), 2, "0")}. ${topic.title}`,
    link: true
  }))
);

export const dsa: Item[] = DSA_DATA.map(play => {
  return {
    value: `${play.docs}`,
    label: play.title,
    icon: IconCode,
    link: true,
    newTab: true
  };
});

export const templates: Item[] = TEMPLATE_DATA.map(t => {
  return {
    value: `${t.liveUrl}`,
    label: t.title,
    icon: IconTemplate,
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
    icon: IconBrandGithub,
    label: "Source Code",
    value: `${GITHUB_URL}/minimal-portfolio`,
    link: true,
    newTab: true,
    key: "y"
  },
  {
    icon: IconMoonStars,
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
  { items: networking, value: "COMPUTER NETWORKING" },
  { items: sql, value: "Structured Query Language - MYSQL" },
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
                  <CommandGroup items={group.items} className={"pr-4"}>
                    <CommandGroupLabel>{group.value}</CommandGroupLabel>
                    <CommandCollection>
                      {(item: Item) => {
                        return (
                          <CommandItem
                            key={item.value}
                            onClick={() => handleItemClick(item)}
                            value={item.value}
                            className={
                              "ml-2 flex w-full flex-col items-start px-2.5 py-2"
                            }>
                            <div className="flex w-full items-center justify-between">
                              <div className="flex items-center gap-2">
                                <item.icon className="primary-ring border-edge size-6 rounded-md border p-1" />

                                <span className="line-clamp-1 flex-1">
                                  {item.label}
                                </span>
                              </div>
                              {item.key && (
                                <KbdGroup>
                                  <Kbd>{item?.key}</Kbd>
                                </KbdGroup>
                              )}
                            </div>
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
