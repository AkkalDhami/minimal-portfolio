import { getGitHubContributions } from "@/data/github-contributions";
import { Suspense } from "react";
import {
  GitHubContributionFallback,
  GitHubContributionGraph
} from "@/components/github/contribution";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

export async function GitHubContributions({
  home = false,
  year
}: {
  home?: boolean;
  year?: string | number;
}) {
  const contributions = await getGitHubContributions(year);

  return (
    <Section
      id="github-contributions"
      className={cn("z-10 px-4 pt-2", home && "screen-line-before pt-3")}>
      <Suspense fallback={<GitHubContributionFallback />}>
        <GitHubContributionGraph initialData={contributions} home={home} />
      </Suspense>
    </Section>
  );
}
