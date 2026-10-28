"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Profile } from "@/components/layouts/profile";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Route } from "next";
import { isActiveLink } from "@/utils/link";
import { PrimaryButton } from "@/components/ui/primary-button";
import { GITHUB_URL, NAME } from "@/lib/constants";
import { ThemeToggle2 } from "@/components/layouts/theme-toggle";
import { cardSlide5Sound } from "@/sounds/card-slide-5";
import { useSound } from "@/hooks/use-sound";
import { uChatScrollButtonSound } from "@/sounds/chat-scroll";
import { IconGitHub } from "@/components/icons";
import { CustomizationTrigger } from "@/components/customization/customization-trigger";

// Load the search UI off the critical path
const SearchCommand = dynamic(() =>
  import("@/components/home/search-command").then(m => m.SearchCommand)
);

interface MenuItem {
  label: string;
  href: Route;
}

export const menuItems: MenuItem[] = [
  { label: "Projects", href: "/projects" },
  { label: "Dev Setup", href: "/dev-setup" },
  { label: "Playbook", href: "/playbook" },
  { label: "Templates", href: "/templates" }
];

const mobileItems: MenuItem[] = [{ label: "Home", href: "/" }, ...menuItems];

export function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [play] = useSound(cardSlide5Sound);
  const [chatScrollPlay] = useSound(uChatScrollButtonSound);
  const pathname = usePathname();

  const closeMenu = () => {
    setMobileMenuOpen(false);
    chatScrollPlay();
  };

  return (
    <>
      <header className="bg-background fixed top-0 right-0 left-0 z-50 flex justify-center pt-1">
        <nav
          className={cn(
            "relative flex items-center justify-between px-4 py-2",
            "w-full max-w-3xl",
            "border-edge border-x",
            "screen-line-before screen-line-after"
          )}>
          <Profile />

          <div className="flex items-center gap-3">
            {/* Single desktop menu with the animated pill */}
            <div
              className="hidden items-center gap-1 p-1 md:flex"
              onMouseLeave={() => setHoveredIndex(null)}>
              {menuItems.map((item, index) => {
                const isActive = isActiveLink(pathname, item.href);
                const isHighlighted =
                  (hoveredIndex ?? (isActive ? index : -1)) === index;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => play()}
                    onMouseEnter={() => setHoveredIndex(index)}
                    className={cn(
                      "relative cursor-pointer px-3 py-1.5 text-xs font-medium tracking-widest uppercase transition-colors duration-200",
                      isHighlighted || isActive
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}>
                    <span className="relative z-10">{item.label}</span>
                    {isHighlighted && (
                      <motion.div
                        layoutId="nav-active"
                        initial={false}
                        className="bg-foreground absolute inset-0 rounded-full"
                        transition={{
                          type: "spring",
                          bounce: 0.25,
                          duration: 0.4
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
              onClick={() => play()}
              className="relative hidden rounded-lg border-0 px-2 py-2 ring-0 sm:block">
              <IconGitHub className="size-5" />
            </PrimaryButton>

            <ThemeToggle2 />

            <button
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => {
                setMobileMenuOpen(o => !o);
                chatScrollPlay();
              }}
              className="relative px-2 py-1.5 transition-colors md:hidden">
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Outside <header>/<nav> so fixed positioning is relative to the viewport */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 z-55 bg-black/40 md:hidden"
            />
            <motion.div
              key="panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="bg-background border-border fixed top-0 right-0 bottom-0 z-60 w-70 overflow-y-auto border-l pb-10 will-change-transform md:hidden">
              <div className="flex h-full flex-col">
                <div className="mb-4 flex items-center p-4">
                  <button
                    onClick={closeMenu}
                    className="rounded-primary bg-muted hover:bg-secondary cursor-pointer p-2 transition-colors">
                    <X size={16} />
                    <span className="sr-only">Close menu</span>
                  </button>
                </div>

                <div className="flex flex-col space-y-4">
                  {mobileItems.map(item => {
                    const isActive = isActiveLink(pathname, item.href);
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          play();
                        }}
                        className={cn(
                          "flex cursor-pointer items-center gap-4 rounded-full px-8 py-2.5 transition-colors duration-200",
                          "text-muted-foreground hover:text-primary",
                          isActive && "text-primary"
                        )}>
                        <span className="text-lg font-medium tracking-widest uppercase">
                          {item.label}
                        </span>
                      </Link>
                    );
                  })}
                </div>

                <div className="border-border/50 mt-auto border-t pt-6">
                  <div className="flex items-center gap-3 px-4">
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
              <CustomizationTrigger />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
