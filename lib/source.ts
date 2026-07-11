import { IPlaybook, ModuleSection } from "@/types/app.types";
import { PLAYBOOK_DATA } from "@/data/playbook";
import { DSA_DATA } from "@/data/dsa";
import { sliceContent } from "@/utils/slice-content";
import { NETWORKING_DATA } from "@/data/networking";

export const findNeighbour = (
  type: "playbook" | "dsa",
  slug: string
): { prev: IPlaybook | undefined; next: IPlaybook | undefined } => {
  const DATA = type === "playbook" ? PLAYBOOK_DATA : DSA_DATA;

  const currentItem = DATA.find(item => item.slug === slug);

  if (!currentItem) {
    return {
      prev: undefined,
      next: undefined
    };
  }

  const index = DATA.sort((a, b) => a.title.localeCompare(b.title)).findIndex(
    item => item.slug === slug
  );

  return {
    prev: index > 0 ? DATA[index - 1] : undefined,
    next: index < DATA.length - 1 ? DATA[index + 1] : undefined
  };
};

export const getDocsItems = (type: ModuleSection) => {
  const items =
    type === "playbook"
      ? PLAYBOOK_DATA
      : type === "dsa"
        ? DSA_DATA
        : NETWORKING_DATA;

  return items.map(i => ({
    href: i.docs,
    // title: i.slug.replaceAll("-", " ")
    title: sliceContent(i.title, 30)
  }));
};

export const getNetworkingTopics = (moduleSlug: string) => {
  const mod = NETWORKING_DATA.find(m => m.slug === moduleSlug);

  return mod?.topics ?? [];
};

export const getNetworkingModuleWithTopics = (moduleSlug: string) => {
  const mod = NETWORKING_DATA.find(m => m.slug === moduleSlug);

  return mod;
};
