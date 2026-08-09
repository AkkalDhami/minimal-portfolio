import { SignalLostGame } from "@/components/not-found/signal-lost-game";
import { Container } from "@/components/shared/container";
import { GravityLetters } from "@/components/ui/gravity-letters";
import Image from "next/image";

export default function NotFound() {
  return (
    <Container className="flex h-screen max-w-4xl items-center justify-center overflow-hidden border-x">
      <div className="text-muted-secondary absolute top-8 right-8 z-10 flex items-center gap-2 text-sm">
        Back to Home
        <kbd className="text-foreground bg-muted rounded-md px-2.5 py-1 text-xs uppercase">
          h
        </kbd>
      </div>
      <SignalLostGame className="absolute z-10 mx-auto w-full max-w-2xl" />
      <h2 className="pointer-events-none absolute bottom-8 mask-b-from-50% font-mono text-8xl font-bold text-neutral-300 uppercase lg:text-[7rem] dark:text-neutral-800">
        404 Not Found
      </h2>
      <GravityLetters
        type="both"
        className="bottom-8 h-full w-full"></GravityLetters>
      <div className="bg-background relative hidden flex-col items-center space-y-6 overflow-hidden p-6 text-center">
        <h2 className="pointer-events-none absolute top-8 z-10 mask-b-from-50% font-mono text-8xl font-bold text-neutral-300 uppercase lg:text-[7rem] dark:text-neutral-800">
          404 Not Found
        </h2>

        <div className="group pointer-events-none relative z-20 flex items-baseline gap-4">
          <Image
            width={300}
            height={300}
            alt="404"
            src={"/images/skull3.png"}
            className="blur-in-lg hidden size-56 opacity-60 sm:inline-block dark:invert"
          />
          <Image
            width={300}
            height={300}
            alt="404"
            src={"/images/skull1.svg"}
            className="size-80 dark:invert"
          />
          <Image
            width={300}
            height={300}
            alt="404"
            src={"/images/skull2.png"}
            className="blur-in-lg hidden size-56 -rotate-12 opacity-60 sm:inline-block dark:invert"
          />
        </div>
      </div>
    </Container>
  );
}
