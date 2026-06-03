"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { CodeWrapper } from "@/components/docs/code-wrapper";
import { usePackageManager } from "@/hooks/use-package-manager";
import { click003Sound } from "@/sounds/click-003";
import { useSound } from "@/hooks/use-sound";
import { getPackageManagerIcon } from "./icon";

type ConvertNpmCommandResult = {
  pnpm: string;
  yarn: string;
  npm: string;
  bun: string;
};

export function convertNpmCommand(npmCommand: string): ConvertNpmCommandResult {
  // npm install
  if (npmCommand.startsWith("npm install")) {
    return {
      pnpm: npmCommand.replaceAll("npm install", "pnpm add"),
      yarn: npmCommand.replaceAll("npm install", "yarn add"),
      npm: npmCommand,
      bun: npmCommand.replaceAll("npm install", "bun add")
    };
  }

  // npx create- (must be checked before generic npx)
  if (npmCommand.startsWith("npx create-")) {
    return {
      pnpm: npmCommand.replace("npx create-", "pnpm create "),
      yarn: npmCommand.replace("npx create-", "yarn create "),
      npm: npmCommand,
      bun: npmCommand.replace("npx", "bunx --bun")
    };
  }

  // npm create
  if (npmCommand.startsWith("npm create")) {
    return {
      pnpm: npmCommand.replace("npm create", "pnpm create"),
      yarn: npmCommand.replace("npm create", "yarn create"),
      npm: npmCommand,
      bun: npmCommand.replace("npm create", "bun create")
    };
  }

  // npx (general)
  if (npmCommand.startsWith("npx")) {
    return {
      pnpm: npmCommand.replace("npx", "pnpm dlx"),
      yarn: npmCommand.replace("npx", "yarn dlx"),
      npm: npmCommand,
      bun: npmCommand.replace("npx", "bunx --bun")
    };
  }

  // npm run
  if (npmCommand.startsWith("npm run")) {
    return {
      pnpm: npmCommand.replace("npm run", "pnpm"),
      yarn: npmCommand.replace("npm run", "yarn"),
      npm: npmCommand,
      bun: npmCommand.replace("npm run", "bun")
    };
  }

  return {
    pnpm: npmCommand,
    yarn: npmCommand,
    npm: npmCommand,
    bun: npmCommand
  };
}

export type PackageManager = keyof ConvertNpmCommandResult;

export default function PackageManagerTabs({
  command = ""
}: {
  command: string;
}) {
  const { pkgManager, setPkgManager } = usePackageManager();

  const [play] = useSound(click003Sound);

  function onChangePackageManager(pkgManager: PackageManager) {
    setPkgManager(pkgManager);
  }

  const Icon = getPackageManagerIcon(pkgManager, "size-5.5");

  return (
    <Tabs
      value={pkgManager}
      className={cn(
        "bg-code my-4 w-full rounded-lg border border-neutral-800"
      )}>
      <TabsList
        style={{
          paddingTop: "3px"
        }}
        variant="underline"
        className={cn(
          "w-full justify-start border-b border-neutral-800 bg-transparent pt-1 pb-2 pl-3"
        )}>
        <div className="mr-3 flex w-5 items-center gap-3 pt-1 pb-1">{Icon}</div>
        <div className="flex items-center gap-1 pt-0">
          {Object.keys(convertNpmCommand("")).map(m => {
            return (
              <TabsTrigger
                key={m}
                value={m}
                className={cn(
                  "flex items-center gap-3 text-neutral-400 hover:text-white",
                  "text-base"
                )}
                onClick={() => {
                  onChangePackageManager(m as PackageManager);
                  play();
                }}>
                {m}
              </TabsTrigger>
            );
          })}
        </div>
      </TabsList>

      {Object.entries(convertNpmCommand(command)).map(([key, cmd]) => {
        const [bin, ...rest] = cmd.split(" ");
        const remaining = rest.join(" ");
        return (
          <TabsContent key={key} value={key}>
            <CodeWrapper code={cmd}>
              <pre className="overflow-x-auto overscroll-x-contain px-4 pt-1 pb-3">
                <code
                  data-slot="code-block"
                  data-language="bash"
                  className="font-code leading-none">
                  <span className="text-[#ffc799]">{bin}</span>{" "}
                  <span className="text-[#52e1e3]">{remaining}</span>
                </code>
              </pre>
            </CodeWrapper>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
