"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { CodeWrapper } from "@/components/docs/code-wrapper";
import { usePackageManager } from "@/hooks/use-package-manager";
import { click003Sound } from "@/sounds/click-003";
import { useSound } from "@/hooks/use-sound";
import { getPackageManagerIcon } from "./icon";

const managers = {
  pnpm: (c: string) => `pnpm dlx ${c.replace("npx ", "")}`,
  npm: (c: string) => c,
  yarn: (c: string) => `yarn ${c.replace("npx ", "")}`,
  bun: (c: string) => `bunx --bun ${c.replace("npx ", "")}`
};

export type PackageManager = keyof typeof managers;

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
        "my-4 w-full rounded-lg border border-neutral-800 bg-black"
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
          {Object.keys(managers).map(m => {
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

      {Object.entries(managers).map(([key, transform]) => {
        const cmd = transform(command);
        const [bin, ...rest] = cmd.split(" ");
        const remaining = rest.join(" ");
        return (
          <TabsContent key={key} value={key}>
            <CodeWrapper code={cmd}>
              <pre className="overflow-x-auto overscroll-x-contain px-4 pb-3">
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
