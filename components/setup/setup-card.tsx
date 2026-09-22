"use client";

import { Circle } from "lucide-react";
import { SetupItem } from "@/data/setup";
import Link from "next/link";
import { Route } from "next";
import { cardSlide5Sound } from "@/sounds/card-slide-5";
import { useSound } from "@/hooks/use-sound";
import { Link1, Link2 } from "@/components/ui/animated-links";

export function SetupCard({ item }: { item: SetupItem }) {
  const [play] = useSound(cardSlide5Sound);
  return (
    <Link1
      href={item.link as Route}
      target="_blank"
      onClick={() => play()}
      rel="noopener noreferrer"
      className="text-muted-foreground animate-fade-in-blur hover:text-primary flex items-center gap-3">
      <h3 className="flex items-center gap-2 text-base font-normal">
        {item.title}
        {item.current && (
          <Circle className="text-primary size-2 fill-current" />
        )}
      </h3>
    </Link1>
  );
}
