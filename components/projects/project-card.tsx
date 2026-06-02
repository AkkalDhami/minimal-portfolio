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
      <motion.div className="group screen-line-before relative p-4 transition-all">
        <div className="flex flex-col gap-6 md:flex-row">
          <Link
            href={`/projects/${project.slug}`}
            className="relative block aspect-video h-48 w-full shrink-0 overflow-hidden md:w-72">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="rounded-primary w-full object-cover transition-transform duration-500"
            />
          </Link>

          <div className="flex flex-1 flex-col justify-between py-1">
            <div className="space-y-3">
              <h3 className="group-hover:text-primary text-xl font-bold transition-colors md:text-2xl">
                {project.title}
              </h3>
              <p className="text-muted-foreground line-clamp-2 md:line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-3.5">
                {project.technologies.map((tech, idx) => {
                  const Icon = getIconForLanguageExtension({
                    name: tech.name,
                    className: "size-7"
                  });
                  // const Icon =
                  //   TECH_ICONS[tech.name.toUpperCase() as TechStack] ||
                  //   TECH_ICONS["DEFAULT"];
                  return (
                    <TooltipProvider key={idx}>
                      <Tooltip>
                        <TooltipTrigger
                          render={
                            <div className="group from-background to-muted primary-ring rounded-primary relative bg-linear-to-b p-1.75">
                              {Icon}
                              {/* <Icon className="text-accent-foreground size-6 rounded" /> */}
                              <div className="corner-squircle rounded-primary supports-corner-shape:rounded-primary pointer-events-none absolute inset-0 ring-1 ring-black/10 ring-inset dark:ring-white/15"></div>
                            </div>
                          }></TooltipTrigger>
                        <TooltipContent>
                          <p className="text-base">{tech.name}</p>
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
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="h-full">
      <Card className="h-full gap-0 overflow-hidden border-transparent dark:bg-transparent">
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
      "px-3 border border-neutral-500/40 rounded-primary bg-transparent py-2 flex items-center justify-center";
    const linkClassName =
      "text-muted-foreground relative primary-ring rounded-primary bg-muted px-2 py-2.5 transition-colors hover:text-foreground hover:bg-muted duration-300 from-background to-muted bg-linear-to-br";
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
                    <LinkIcon className="size-4" />
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
                    <SiGithub className="size-4" />
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
                  <ArrowUpRight className="size-4" />
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
