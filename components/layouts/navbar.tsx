"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Profile } from "@/components/layouts/profile";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Route } from "next";
import { isActiveLink } from "@/utils/link";
import { PrimaryButton } from "@/components/ui/primary-button";
import { GITHUB_URL, NAME } from "@/lib/constants";
import { SiGithub } from "react-icons/si";
import { SearchCommand } from "@/components/home/search-command";
import { ThemeToggle } from "@/components/layouts/theme-toggle";
import { cardSlide5Sound } from "@/sounds/card-slide-5";
import { useSound } from "@/hooks/use-sound";
import { uChatScrollButtonSound } from "@/sounds/chat-scroll";
import { Button } from "@/components/ui/button";
import { IconVolume, IconVolumeOff } from "@tabler/icons-react";
import { usePreferencesStore } from "@/hooks/use-preferences";

interface MenuItem {
  label: string;
  href: Route;
}

export const menuItems: MenuItem[] = [
  {
    label: "Projects",
    href: "/projects"
  },
  {
    label: "Dev Setup",
    href: "/dev-setup"
  },
  {
    label: "Playbook",
    href: "/playbook"
  },
  {
    label: "Templates",
    href: "/templates"
  }
];

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [play] = useSound(cardSlide5Sound);
  const [chatScrollPlay] = useSound(uChatScrollButtonSound);
  const { soundEnabled, toggleSound } = usePreferencesStore();
  const pathname = usePathname();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <header className="bg-background fixed top-0 right-0 left-0 z-50 flex justify-center pt-1 backdrop-blur-lg">
        <nav
          className={cn(
            "relative flex items-center justify-between px-4 py-2.5 transition-all duration-500",
            "w-full max-w-4xl backdrop-blur-md",
            "border-edge border-x",
            "screen-line-before screen-line-after"
          )}>
          <Profile />

          <div className="flex items-center gap-3">
            <div
              className="border-edge/60 hidden items-center gap-1 p-1 backdrop-blur-md md:flex"
              onMouseLeave={() => setHoveredIndex(null)}>
              {menuItems.map((item, index) => {
                const isActive = isActiveLink(pathname, item.href);
                const isMoving =
                  (hoveredIndex ?? (isActive ? index : -1)) === index;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => play()}
                    onMouseEnter={() => setHoveredIndex(index)}
                    className={cn(
                      "relative cursor-pointer px-3 py-1.5 text-xs font-medium tracking-widest uppercase transition-all duration-300",
                      isMoving
                        ? "text-accent"
                        : "text-muted-primary hover:text-primary"
                    )}>
                    <span className="relative z-10">{item.label}</span>
                    {isMoving && (
                      <motion.div
                        layoutId="nav-active"
                        initial={false}
                        className="bg-foreground group absolute inset-0 rounded-full"
                        transition={{
                          type: "spring",
                          bounce: 0.25,
                          duration: 0.5
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
            <SearchCommand />
            <PrimaryButton
              variant="outline"
              as="a"
              href={`${GITHUB_URL}/minimal-portfolio` as Route}
              target="_blank"
              className="relative hidden rounded-lg border-0 px-2 py-2 ring-0 sm:block">
              <SiGithub onClick={() => play()} className="size-5" />
            </PrimaryButton>
            <ThemeToggle className="py-1.5" />
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                chatScrollPlay();
                return;
              }}
              className="relative px-2 py-1.5 transition-colors md:hidden">
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <Button variant="ghost" size="icon" onClick={toggleSound}>
              {soundEnabled ? <IconVolume /> : <IconVolumeOff />}
            </Button>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    chatScrollPlay();
                  }}
                  className="bg-background/40 fixed inset-0 z-10 h-screen backdrop-blur-sm md:hidden"
                />
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="bg-background border-border fixed top-0 right-0 bottom-0 z-60 h-screen w-70 overflow-y-auto border-l pb-10 md:hidden">
                  <div className="bg-background flex h-full flex-col p-6">
                    <div className="mb-8 flex items-center justify-between">
                      <span className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
                        Menu
                      </span>
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          chatScrollPlay();
                        }}
                        className="group rounded-primary bg-muted hover:bg-secondary relative cursor-pointer p-2 transition-colors">
                        <X size={16} />
                        <span className="sr-only">Close menu</span>
                      </button>
                    </div>

                    <div className="flex flex-col space-y-4">
                      {[{ label: "Home", href: "/" }, ...menuItems].map(
                        item => {
                          const isActive = isActiveLink(pathname, item.href);
                          return (
                            <Link
                              key={item.label}
                              href={item.href as Route}
                              onClick={() => {
                                setMobileMenuOpen(false);
                                play();
                              }}
                              className={cn(
                                "group relative flex cursor-pointer items-center gap-4 rounded-full px-8 py-2.5 transition-all duration-200",
                                isActive
                                  ? "bg-foreground text-accent"
                                  : "hover:bg-foreground hover:text-accent"
                              )}>
                              <span className="text-lg font-medium tracking-widest uppercase">
                                {item.label}
                              </span>
                            </Link>
                          );
                        }
                      )}
                    </div>

                    <div className="border-border/50 mt-auto border-t pt-6">
                      <div className="flex items-center gap-3">
                        <Profile />
                        <div className="flex flex-col space-y-1.5">
                          <span className="text-sm font-semibold tracking-tight">
                            {NAME}
                          </span>
                          <span className="text-muted-foreground text-[10px] tracking-widest uppercase">
                            Full Stack Developer
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </nav>
      </header>
    </>
  );
}
