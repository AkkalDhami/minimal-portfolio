"use client";

import { sliceContent } from "@/utils/slice-content";
import { Route } from "next";
import { PrimaryButton } from "@/components/ui/primary-button";
import { cn } from "@/lib/utils";
import { IPlaybook } from "@/types/app.types";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSound } from "@/hooks/use-sound";
import { cardSlide5Sound } from "@/sounds/card-slide-5";

export const NextSteps = ({
  next,
  prev,
  min,
  className
}: {
  next?: IPlaybook | undefined;
  prev?: IPlaybook | undefined;
  min?: boolean;
  className?: string;
}) => {
  // useNextStepsKeyboard({ next, prev });
  const [play] = useSound(cardSlide5Sound);
  const router = useRouter();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.repeat) return;

      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
        return;
      }

      const target = event.target as HTMLElement | null;

      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (event.key === "ArrowLeft" && prev) {
        event.preventDefault();
        router.push(prev.docs as Route);
        play();
      }

      if (event.key === "ArrowRight" && next) {
        event.preventDefault();
        router.push(next.docs as Route);
        play();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [next, play, prev, router]);

  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      {prev && (
        <PrimaryButton
          variant="outline"
          className={cn(
            "group font-medium tracking-normal capitalize",
            min ? "px-2 py-2" : "px-4 py-2"
          )}
          as="a"
          href={prev.docs as Route}
          onClick={() => play()}>
          <div className="flex items-center gap-1">
            <IconArrowLeft className="size-4" />
            {!min && (
              <span className="hidden sm:inline">
                {sliceContent(prev.title, 38)}
              </span>
            )}
          </div>
        </PrimaryButton>
      )}
      {next && (
        <div className="flex items-center justify-end">
          <PrimaryButton
            variant="outline"
            className={cn(
              "group font-medium tracking-normal capitalize",
              min ? "px-2 py-2" : "px-4 py-2"
            )}
            as="a"
            title={next.title}
            href={next.docs as Route}
            onClick={() => play()}>
            <div className="flex items-center gap-1">
              {!min && (
                <span className="hidden sm:inline">
                  {sliceContent(next.title, 38)}
                </span>
              )}
              <IconArrowRight className="size-4" />
            </div>
          </PrimaryButton>
        </div>
      )}
    </div>
  );
};

type NextStepsProps = {
  next?: IPlaybook;
  prev?: IPlaybook;
};

export function useNextStepsKeyboard({ next, prev }: NextStepsProps) {
  useEffect(() => {
    function isEditable(target: EventTarget | null) {
      return (
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      );
    }

    function handleKeyDown(event: KeyboardEvent) {
      // Ignore repeated key presses
      if (event.repeat) return;

      // Ignore modifier keys
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
        return;
      }

      // Don't interfere while typing
      if (isEditable(event.target)) return;

      switch (event.key) {
        case "ArrowLeft":
          if (prev) {
            event.preventDefault();
            window.location.assign(prev.docs);
          }
          break;

        case "ArrowRight":
          if (next) {
            event.preventDefault();
            window.location.assign(next.docs);
          }
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [next, prev]);
}
