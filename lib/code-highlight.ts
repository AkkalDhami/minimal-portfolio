import { createHighlighter, type Highlighter } from "shiki";

let highlighterPromise: Promise<Highlighter> | null = null;

export function getCodeHighlighter(language: string): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [
        "github-light-default",
        "github-light-high-contrast",
        "min-light",
        "vesper",
        "ayu-dark",
        "github-dark-default",
        "ayu-light",
        "one-light",
        "light-plus",
        "slack-ochin"
      ],
      langs: [language]
    });
  }
  return highlighterPromise;
}
