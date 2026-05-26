import { IPlaybook } from "@/types/app.types";
import { PLAYBOOK_DATA } from "@/data/playbook";
import { DSA_DATA } from "@/data/dsa";

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
