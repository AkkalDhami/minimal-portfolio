"use client";

import { Container } from "@/components/shared/container";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker";
import { IconLoader2 } from "@tabler/icons-react";

const SqlPlayground = dynamic(
  () =>
    import("@/components/sql-playground/sql-playground").then(
      m => m.SqlPlayground
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-dvh w-full items-center justify-center">
        <Marker className="flex items-center gap-4">
          <MarkerIcon>
            <IconLoader2 className="size-8 animate-spin" />
          </MarkerIcon>

          <MarkerContent className="shimmer text-xl">
            Loading SQL engine...
          </MarkerContent>
        </Marker>
      </div>
    )
  }
);

export function SqlPlaygroundClient({ query }: { query?: string }) {
  return (
    <Container className={cn("border-edge border-x pt-16")}>
      <SqlPlayground query={query} />
    </Container>
  );
}
