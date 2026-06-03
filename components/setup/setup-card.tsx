"use client";

import { Circle } from "lucide-react";
import { SetupItem } from "@/data/setup";
import Link from "next/link";
import { Route } from "next";
import { cardSlide5Sound } from "@/sounds/card-slide-5";
import { useSound } from "@/hooks/use-sound";

export function SetupCard({ item }: { item: SetupItem }) {
  const [play] = useSound(cardSlide5Sound);
  return (
    <Link
      href={item.link as Route}
      target="_blank"
      onClick={() => play()}
      rel="noopener noreferrer"
      className="text-muted-foreground animate-fade-in-blur hover:text-foreground flex items-center gap-3 underline-offset-2 hover:underline">
      <h3 className="flex items-center gap-2 text-base font-normal">
        {item.title}
        {item.current && (
          <Circle className="size-2 fill-current text-green-500" />
        )}
      </h3>
    </Link>
  );
}
