export interface ITheme {
  label: string;
  value: string;
}

export const CODE_THEMES: ITheme[] = [
  {
    label: "Ayu Dark",
    value: "ayu-dark"
  },
  {
    label: "Dracula",
    value: "dracula"
  },
  {
    label: "Andromeeda",
    value: "andromeeda"
  },
  {
    label: "Vesper(Default)",
    value: "vesper"
  },
  {
    label: "Plastic",
    value: "plastic"
  },
  {
    label: "Synthwave 84",
    value: "synthwave-84"
  },
  {
    label: "Material Theme",
    value: "material-theme"
  },
  {
    label: "Monokai",
    value: "monokai"
  },
  {
    label: "GitHub Dark",
    value: "github-dark-default"
  },
  {
    label: "One Dark Pro",
    value: "one-dark-pro"
  }
];

import { createHighlighter } from "shiki";

const highlighter = await createHighlighter({
  themes: ["vesper", "dracula", "ayu-dark" /* ...load lazily as needed */],
  langs: ["ts", "tsx", "bash", "json"] // whatever you use
});

export function highlight(code: string, lang: string, theme: string) {
  return highlighter.codeToHtml(code, { lang, theme });
}
