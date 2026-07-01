import { getGitHubContributions } from "@/data/github-contributions";
import { Suspense } from "react";
import {
  GitHubContributionFallback,
  GitHubContributionGraph
} from "@/components/github/contribution";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { lastYearContributions } from "@/data/contributions";

export async function GitHubContributions({
  home = false,
  year,
  fetch = true
}: {
  home?: boolean;
  year?: string | number;
  fetch?: boolean;
}) {
  const contributions = !fetch
    ? lastYearContributions
    : await getGitHubContributions(year);

  return (
    <Section
      id="github-contributions"
      className={cn("z-10 px-4 pt-2", home && "screen-line-before pt-3")}>
      {!fetch ? (
        <GitHubContributionGraph
          initialData={lastYearContributions}
          home={home}
          fetch={false}
        />
      ) : (
        <Suspense fallback={<GitHubContributionFallback />}>
          <GitHubContributionGraph initialData={contributions} home={home} />
        </Suspense>
      )}
    </Section>
  );
}
