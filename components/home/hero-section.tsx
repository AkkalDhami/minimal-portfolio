"use client";

import { motion } from "motion/react";

import { FlipWords } from "@/components/ui/flip-words";

import { SocialLinks } from "./social-link";
import { PrimaryButton } from "@/components/ui/primary-button";
import { TechBadge } from "@/components/projects/tech-badge";
import { HOME_PAGE_STACKS } from "@/utils/stack";
import { NAME } from "@/lib/constants";
import { Route } from "next";
import { BlurText } from "@/components/ui/blur-text";
import { SplitText } from "@/components/ui/split-text";

const HERO_WORDS = [
  "systems that scale under pressure.",
  "APIs designed for real traffic.",
  "scalable backend systems that power real products.",
  "codebases that stay maintainable.",
  "performance-first engineering."
];

const fadeUp = {
  initial: { opacity: 0, y: 20, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" }
};

export function HeroSection() {
  return (
    <section
      id="about"
      className="screen-line relative z-10 px-4 pt-16 pb-0 font-sans font-normal">
      <div className="mt-4">
        <div className="flex items-baseline-last gap-2">
          <BlurText
            text={NAME}
            delay={80}
            animateBy="letters"
            direction="top"
            className="font-inter text-4xl font-semibold tracking-wide uppercase sm:text-5xl lg:text-6xl xl:text-7xl"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col space-y-5 lg:text-left">
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-muted-primary mt-4 hidden overflow-hidden text-lg font-medium sm:block md:text-xl">
            I build <FlipWords words={HERO_WORDS} />
          </motion.h2>
          <SplitText
            text="I design scalable web systems focused on performance, maintainability,
          and real-world impact."
            className="text-muted-foreground text-lg leading-relaxed"
            delay={50}
            duration={1.25}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="left"
          />

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-muted-foreground w-full text-lg leading-relaxed">
            <div className="flex flex-wrap items-center gap-3">
              {HOME_PAGE_STACKS.map(tech => (
                <TechBadge
                  key={tech.value}
                  className="rounded-primary border-edge px-2.5 py-1.5">
                  <div className="flex items-center gap-2">
                    <tech.icon className="size-4" />
                    {tech.label}
                  </div>
                </TechBadge>
              ))}
            </div>
          </motion.div>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-5 lg:justify-start">
            <PrimaryButton
              as="a"
              href="/projects"
              className="rounded-primary primary-ring w-full py-3.5 sm:w-auto">
              View My Work
            </PrimaryButton>
            <PrimaryButton
              variant="outline"
              as="a"
              target="_blank"
              rel="noopener noreferrer"
              href={"/resume.pdf" as Route}
              className="rounded-primary from-background to-muted primary-ring w-full bg-linear-to-br py-3.5 sm:w-auto">
              View My Resume
            </PrimaryButton>
          </motion.div>
          <div className="mt-1">
            <SocialLinks minimal={false} className="sm:gap-6" />
          </div>
        </motion.div>
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
