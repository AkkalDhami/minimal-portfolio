"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Check, LinkIcon } from "lucide-react";
import type { Tech } from "@/components/projects/tech-badge";
import type { Project } from "@/data/projects";
import { TechBadge } from "@/components/projects/tech-badge";
import { DetailSwapCard } from "@/components/projects/card";
import type { Route } from "next";
import { PrimaryButton } from "@/components/ui/primary-button";

import { motion } from "motion/react";

import Image from "next/image";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useSound } from "@/hooks/use-sound";
import { cardSlide5Sound } from "@/sounds/card-slide-5";
import { getIconForLanguageExtension } from "@/components/docs/icon";

export function ProjectCard({
  project,
  details = false
}: {
  project: Project;
  details?: boolean;
}) {
  if (!details) {
    return (
      <motion.div className="group animate-fade-in-blur screen-line-before relative p-4 transition-all">
        <motion.div className="flex flex-col gap-6">
          <Link
            href={`/projects/${project.slug}`}
            className="relative block aspect-video h-60 w-full shrink-0 overflow-hidden">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="rounded-primary w-full object-cover transition-transform duration-500"
            />
            {project.status === "ongoing" && (
              <motion.div
                style={{
                  filter: "blur(0px)"
                }}
                className="absolute top-1 right-1 z-10 flex items-center justify-center rounded-full border border-amber-400 bg-amber-50 px-2 py-1 text-xs font-medium text-amber-600 uppercase">
                {"Ongoing"}
              </motion.div>
            )}
          </Link>

          <div className="flex flex-1 flex-col justify-between py-1">
            <div className="space-y-3">
              <motion.h3
                style={{
                  filter:
                    project.status === "ongoing" ? "blur(1px)" : "blur(0px)"
                }}
                className="group-hover:text-primary text-xl font-bold transition-colors md:text-2xl">
                {project.title}
              </motion.h3>
              <motion.p
                style={{
                  filter:
                    project.status === "ongoing" ? "blur(1px)" : "blur(0px)"
                }}
                className="text-muted-foreground line-clamp-2 md:line-clamp-3">
                {project.description}
              </motion.p>

              <div className="flex flex-wrap gap-3.5">
                {project.technologies.map((tech, idx) => {
                  const Icon = getIconForLanguageExtension({
                    name: tech.name,
                    className: "size-5"
                  });
                  // const Icon =
                  //   TECH_ICONS[tech.name.toUpperCase() as TechStack] ||
                  //   TECH_ICONS["DEFAULT"];
                  return (
                    <TooltipProvider key={idx}>
                      <Tooltip>
                        <TooltipTrigger
                          render={
                            <div className="group from-background to-muted primary-ring rounded-primary relative bg-linear-to-b p-1.5">
                              {Icon}
                              <div className="corner-squircle rounded-primary supports-corner-shape:rounded-primary pointer-events-none absolute inset-0 ring-1 ring-black/10 ring-inset dark:ring-white/15"></div>
                            </div>
                          }></TooltipTrigger>
                        <TooltipContent>
                          <p className="text-sm">{tech.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  );
                })}
              </div>

              <div className="mt-4 flex justify-end">
                <ProjectLinks project={project} />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="h-full">
      <Card className="animate-fade-in-blur h-full gap-0 overflow-hidden border-transparent py-2 dark:bg-transparent">
        <div className="relative aspect-video">
          <DetailSwapCard
            data={{
              images: project.images
            }}
            imageHeight={480}
            imageFit="cover"
            showThumbnailNavigator
            showDotIndicator
            showImageCounter={false}
          />
          {project.status === "ongoing" && (
            <motion.div
              style={{
                filter: "blur(0px)"
              }}
              className="absolute top-6 right-6 z-10 flex items-center justify-center rounded-full border border-amber-400 bg-amber-50 px-2 py-1 text-xs font-medium text-amber-600 uppercase">
              {"Ongoing"}
            </motion.div>
          )}
        </div>

        <CardContent className="space-y-4 border-0 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex items-start justify-between">
            <h3 className="text-xl font-medium md:text-2xl">{project.title}</h3>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="text-muted-primary text-[15px] leading-relaxed">
            {project.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-3">
            <motion.h4
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-muted-primary text-base font-semibold">
              Key Features:
            </motion.h4>
            <motion.ul
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col space-y-2">
              {project.features.map((feature: string, idx: number) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="text-muted-foreground flex items-center text-base font-medium">
                  <Check className="mr-2 h-4 w-4" /> {feature}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-3">
            <motion.h4
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-muted-primary text-base font-semibold">
              Technologies:
            </motion.h4>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-wrap gap-3">
              {project.technologies.map((tech: Tech, idx: number) => {
                const Icon = getIconForLanguageExtension({
                  name: tech.name,
                  className: "size-5"
                });
                return (
                  <TechBadge
                    key={idx}
                    className="bg-gradient-t rounded-lg text-base">
                    <div className="flex items-center gap-2">
                      {Icon}
                      {tech.name}
                    </div>
                  </TechBadge>
                );
              })}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-3">
            <motion.h4
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-muted-primary text-base font-semibold">
              Links:
            </motion.h4>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="group flex flex-wrap gap-6">
              <ProjectLinks project={project} details />
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function ProjectLinks({
  details = false,
  project
}: {
  details?: boolean;
  project: Project;
}) {
  const [play] = useSound(cardSlide5Sound);

  if (!details) {
    const baseClassName =
      "border border-neutral-500/40 rounded-primary bg-transparent flex items-center justify-center";
    const linkClassName =
      "text-muted-foreground relative primary-ring rounded-primary bg-muted px-2.25 py-2 transition-colors hover:text-foreground hover:bg-muted duration-300 from-background to-muted bg-linear-to-br";
    return (
      <div className="flex items-center gap-4">
        {project.liveUrl && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                className={baseClassName}
                render={
                  <Link
                    href={project.liveUrl as Route}
                    onClick={() => play()}
                    target="_blank"
                    className={cn("primary-ring", linkClassName)}>
                    <LinkIcon className="size-3.5" />
                  </Link>
                }
              />
              <TooltipContent>
                <p>Live Demo</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {project.githubUrl && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                className={baseClassName}
                render={
                  <Link
                    href={project.githubUrl as Route}
                    target="_blank"
                    onClick={() => play()}
                    className={linkClassName}>
                    <SiGithub className="size-3.5" />
                    <div className="corner-squircle rounded-primary supports-corner-shape:rounded-primary ring-muted pointer-events-none absolute inset-0 ring-1 ring-inset dark:ring-white/15"></div>
                  </Link>
                }
              />
              <TooltipContent>
                <p>Source Code</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              className={baseClassName}
              render={
                <Link
                  href={`/projects/${project.slug}`}
                  onClick={() => play()}
                  className={linkClassName}>
                  <ArrowUpRight className="size-3.5" />
                </Link>
              }
            />
            <TooltipContent>
              <p>Project Details</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group flex flex-wrap gap-6">
      {project.liveUrl && (
        <PrimaryButton
          as="a"
          href={project.liveUrl as Route}
          onClick={() => play()}
          target="_blank"
          className="group hover:shadow-primary relative py-2 font-medium">
          Live Demo
        </PrimaryButton>
      )}

      {project.githubUrl && (
        <PrimaryButton
          variant="outline"
          onClick={() => play()}
          as="a"
          href={project.githubUrl as Route}
          target="_blank"
          className="group hover:shadow-primary relative py-2 font-normal">
          Source Code
        </PrimaryButton>
      )}
    </motion.div>
  );
}
