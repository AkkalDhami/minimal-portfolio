"use client";

import { useSound } from "@/hooks/use-sound";
import { cardSlide5Sound } from "@/sounds/card-slide-5";
import Link from "next/link";

export function HLink({ ...props }: React.ComponentProps<typeof Link>) {
  const [play] = useSound(cardSlide5Sound);
  return (
    <Link
      onClick={() => play()}
      className="not-typeset underline-offset-4 hover:underline"
      {...props}
    />
  );
}
