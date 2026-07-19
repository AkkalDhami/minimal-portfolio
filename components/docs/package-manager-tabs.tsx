"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { CodeWrapper } from "@/components/docs/code-wrapper";
import { usePackageManager } from "@/hooks/use-package-manager";
import { click003Sound } from "@/sounds/click-003";
import { useSound } from "@/hooks/use-sound";
import { getPackageManagerIcon } from "./icon";
import { getCodeHighlighter } from "@/lib/code-highlight";
import { useEffect, useState } from "react";

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
  const [html, setHtml] = useState<Record<PackageManager, string>>({
    pnpm: "",
    yarn: "",
    npm: "",
    bun: ""
  });

  useEffect(() => {
    let cancelled = false;

    async function highlight() {
      const highlighter = await getCodeHighlighter("bash");
      if (cancelled) return;

      const commands = convertNpmCommand(command);

      const highlighted = Object.fromEntries(
        Object.entries(commands).map(([key, value]) => [
          key,
          highlighter.codeToHtml(value || " ", {
            lang: "bash",
            themes: {
              light: "github-light-high-contrast",
              dark: "vesper"
            },
            defaultColor: "light-dark()"
          })
        ])
      ) as Record<PackageManager, string>;

      setHtml(highlighted);
    }

    highlight();

    return () => {
      cancelled = true;
    };
  }, [command]);

  function onChangePackageManager(pkgManager: PackageManager) {
    setPkgManager(pkgManager);
  }

  const Icon = getPackageManagerIcon(pkgManager, "size-5.5");

  return (
    <Tabs
      value={pkgManager}
      className={cn(
        "dark:bg-code my-4 w-full rounded-lg border bg-neutral-100"
      )}>
      <TabsList
        style={{
          paddingTop: "3px",
          paddingBottom: "3px"
        }}
        variant="underline"
        className={cn(
          "w-full justify-start border-b bg-transparent pt-1 pb-2 pl-3"
        )}>
        <div className="mr-3 flex w-5 items-center gap-3 pt-1 pb-1">{Icon}</div>
        <div className="flex items-center gap-1 pt-0">
          {Object.keys(convertNpmCommand("")).map(m => {
            return (
              <TabsTrigger
                key={m}
                value={m}
                className={cn(
                  "text-muted-foreground hover:text-foreground flex items-center gap-3",
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
        return (
          <TabsContent key={key} value={key}>
            <CodeWrapper code={cmd}>
              <pre className="not-typeset overflow-x-auto overscroll-x-contain px-4 pt-2 pb-4">
                <div
                  dangerouslySetInnerHTML={{
                    __html: html[key as PackageManager]
                  }}
                  className="font-code text-base leading-none"
                />
              </pre>
            </CodeWrapper>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
