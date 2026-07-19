"use client";

import { NETWORKING_DATA } from "@/data/networking";
import { useSound } from "@/hooks/use-sound";
import { cardSlide5Sound } from "@/sounds/card-slide-5";
import { Route } from "next";
import Link from "next/link";

export function NetworkingModule({ slug }: { slug: string }) {
  const mod = NETWORKING_DATA.find(mod => mod.slug === slug);
  const [play] = useSound(cardSlide5Sound);

  if (!mod) return null;

  return (
    <div className="not-typeset mt-4 space-y-4">
      <Link
        href={mod.docs as Route}
        className="animate-fade-in-blur text-2xl font-medium underline-offset-2 hover:underline">
        {mod.title}
      </Link>

      <p className="text-muted-foreground animate-fade-in-blur text-lg">
        {mod.description}
      </p>

      <div className="divide-edge grid space-y-4 divide-y border-t pt-4">
        {mod.topics.map(topic => (
          <Link
            key={topic.slug}
            href={`${mod.docs}${topic.docs}` as Route}
            onClick={() => play()}
            className="group divde-x animate-fade-in-blur divide-edge grid pl-4 last:border-b">
            <div className="flex items-center gap-3">
              <h3 className="group-hover:text-primary flex items-center text-lg font-medium underline-offset-4 transition-colors group-hover:underline">
                {topic?.order.toString().padStart(2, "0")}. {topic.title}
              </h3>
            </div>

            <p className="text-muted-foreground mb-4 leading-relaxed">
              {topic.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
