"use client";
import { LinkIcon } from "lucide-react";
import type { Route } from "next";

import Image from "next/image";

import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { ITemplate } from "@/components/templates/template-section";
import { cardSlide5Sound } from "@/sounds/card-slide-5";
import { useSound } from "@/hooks/use-sound";
import { getIconForLanguageExtension } from "@/components/docs/icon";
import { IconGitHub } from "@/components/icons";

export function TemplateCard({ template }: { template: ITemplate }) {
  return (
    <div className="group animate-fade-in-blur screen-line-before relative p-4 transition-all">
      <div className="flex flex-col gap-6">
        <Image
          src={template.thumbnail}
          alt={template.title}
          width={200}
          height={200}
          className="rounded-primary h-56 w-auto object-cover grayscale-100 transition-all duration-300 group-hover:grayscale-0"
        />
        <div className="p1 flex flex-1 flex-col justify-between">
          <div className="space-y-3">
            <h3 className="group-hover:text-primary text-xl font-bold transition-colors md:text-2xl">
              {template.title}
            </h3>
            <p className="text-muted-foreground line-clamp-2 md:line-clamp-3">
              {template.description}
            </p>

            <div className="flex flex-wrap gap-3.5">
              {template.technologies.map((tech, idx) => {
                const Icon = getIconForLanguageExtension({
                  name: tech.name,
                  className: "size-5"
                });
                return (
                  <TooltipProvider key={idx}>
                    <Tooltip>
                      <TooltipTrigger
                        render={
                          <div className="group from-background to-muted primary-ring relative rounded-md bg-linear-to-b px-2 py-2 grayscale-100 duration-300 group-hover:grayscale-0">
                            {Icon}
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
              <Links template={template} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Links({ template }: { template: ITemplate }) {
  const [play] = useSound(cardSlide5Sound);
  const baseClassName =
    "border border-neutral-500/40 bg-transparent flex items-center justify-center";
  const linkClassName =
    "text-muted-foreground bg-muted rounded-primary primary-ring relative px-2.25 py-2 transition-colors hover:text-foreground hover:bg-muted duration-300 from-background to-muted bg-linear-to-b";
  return (
    <div className="flex items-center gap-4">
      {template.liveUrl && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              className={baseClassName}
              render={
                <Link
                  href={template.liveUrl as Route}
                  target="_blank"
                  onClick={() => play()}
                  className={linkClassName}>
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
      {template.githubUrl && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              className={baseClassName}
              render={
                <Link
                  href={template.githubUrl as Route}
                  target="_blank"
                  onClick={() => play()}
                  className={linkClassName}>
                  <IconGitHub className="size-3.5" />
                </Link>
              }
            />
            <TooltipContent>
              <p>Source Code</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}
