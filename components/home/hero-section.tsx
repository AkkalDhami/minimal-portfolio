"use client";

import { motion } from "motion/react";

import { FlipWords } from "@/components/ui/flip-words";

import { SocialLinks } from "./social-link";
import { PrimaryButton } from "@/components/ui/primary-button";
import { HOME_PAGE_STACKS } from "@/utils/stack";
import { NAME } from "@/lib/constants";
import { Route } from "next";
import { getIconForLanguageExtension } from "@/components/docs/icon";

const HERO_WORDS = [
  "systems that scale under pressure.",
  "APIs designed for real traffic.",
  "scalable backend systems that power real products.",
  "codebases that stay maintainable.",
  "performance-first engineering."
];

export function HeroSection() {
  return (
    <section
      id="about"
      className="screen-line relative z-10 px-4 pt-16 pb-4 font-sans font-normal">
      <div className="mt-4">
        <div className="flex items-baseline-last gap-2">
          <h1 className="font-inter text-4xl font-semibold tracking-wide uppercase sm:text-4xl lg:text-5xl xl:text-6xl">
            {NAME}
          </h1>
        </div>
        <div className="flex flex-col space-y-5 lg:text-left">
          <div className="lex flex-col space-y-5 lg:text-left">
            <h2 className="text-muted-primary mt-4 hidden overflow-hidden text-lg font-medium sm:block md:text-xl">
              I build <FlipWords words={HERO_WORDS} />
            </h2>
            <p className="text-muted-foreground mt-2 text-lg leading-relaxed sm:mt-0">
              I design scalable web systems focused on performance,
              maintainability, and real-world impact.
            </p>

            <div className="text-muted-foreground w-full text-lg leading-relaxed">
              <div className="flex flex-wrap items-center gap-3">
                {HOME_PAGE_STACKS.map(tech => {
                  const Icon = getIconForLanguageExtension({
                    name: tech.value,
                    className: "size-5"
                  });
                  return (
                    <div
                      key={tech.value}
                      className="from-secondary via-background to-muted ring-edge rounded-lg bg-linear-to-b px-3 py-1.5 ring">
                      <div className="text-accent-foreground flex items-center gap-2 text-base">
                        {Icon}
                        {tech.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-5 lg:justify-start">
              <PrimaryButton
                as="a"
                href="/projects"
                className="rounded-primary primary-ring w-full px-4 py-3.5 sm:w-auto">
                View My Work
              </PrimaryButton>
              <PrimaryButton
                variant="outline"
                as="a"
                target="_blank"
                rel="noopener noreferrer"
                href={"/resume.pdf" as Route}
                className="rounded-primary from-background to-muted primary-ring w-full bg-linear-to-br px-4 py-3.5 sm:w-auto">
                View My Resume
              </PrimaryButton>
            </div>
          </div>
          <div className="mt-1">
            <SocialLinks minimal={false} className="sm:gap-6" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function HeroSectionBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <div
        aria-hidden
        className="absolute inset-0 isolate hidden contain-strict lg:block">
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1.8,
            ease: "easeOut"
          }}
          viewport={{ once: true }}
          className="absolute top-0 left-0 z-40 h-380 w-140 -translate-y-87.5 -rotate-45 rounded-full dark:bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]"
        />

        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1.8,
            ease: "easeOut",
            delay: 0.4
          }}
          viewport={{ once: true }}
          className="absolute top-0 right-0 z-40 h-380 w-140 -translate-y-87.5 rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)] dark:bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]"
        />
      </div>
    </div>
  );
}
