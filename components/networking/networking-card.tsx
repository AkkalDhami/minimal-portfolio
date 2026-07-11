"use client";

import { cn } from "@/lib/utils";
import { cardSlide5Sound } from "@/sounds/card-slide-5";
import { useSound } from "@/hooks/use-sound";
import { IDocument } from "@/types/app.types";
import Link from "next/link";
import { Route } from "next";

export function NetworkingCard({
  data,
  className,
  docs
}: {
  data: IDocument;
  className?: string;
  docs: string;
}) {
  const [play] = useSound(cardSlide5Sound);

  return (
    <Link
      href={`${docs}/${data?.slug}` as Route}
      onClick={() => play()}
      className={cn(
        "group hover:bg-card-hover p-4",
        "animate-fade-in-blur",
        className
      )}>
      <h2 className="text-muted-primary group-hover:text-foreground font-noraml mb-2 line-clamp-1 text-lg underline-offset-4 group-hover:underline">
        {data.order.toString().padStart(2, "0")}. {data?.title}
      </h2>
      {data?.description && (
        <p className="text-muted-secondary line-clamp-2">
          {data?.description || ""}
        </p>
      )}
    </Link>
  );
}
