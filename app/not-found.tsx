import { Container } from "@/components/shared/container";
import Image from "next/image";

export default function NotFound() {
  return (
    <Container className="flex h-screen max-w-4xl items-center justify-center overflow-hidden border-x">
      <div className="bg-background relative flex flex-col items-center space-y-6 overflow-hidden p-6 text-center">
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
