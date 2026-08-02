import { IPlaybook, ModuleSection } from "@/types/app.types";
import { sliceContent } from "@/utils/slice-content";
import { PLAYBOOK_DATA } from "@/data/playbook";
import { DSA_DATA } from "@/data/dsa";
import { NETWORKING_DATA } from "@/data/networking";
import { SQL_DATA } from "@/data/sql";
import { SYSTEM_DESIGN_DATA } from "@/data/system-design";

export const findNeighbour = (
  type: ModuleSection,
  slug: string
): { prev: IPlaybook | undefined; next: IPlaybook | undefined } => {
  const options: Record<ModuleSection, IPlaybook[]> = {
    dsa: DSA_DATA,
    playbook: PLAYBOOK_DATA,
    "system-design": SYSTEM_DESIGN_DATA,
    networking: NETWORKING_DATA.map(m =>
      m.topics.map(t => ({ ...t, docs: `${m.docs}${t.docs}` }))
    ).flat(),
    sql: SQL_DATA.map(m =>
      m.topics.map(t => ({ ...t, docs: `${m.docs}${t.docs}` }))
    ).flat()
  };

  const DATA = options[type];

  const currentItem = DATA.find(item => item.slug === slug);

  if (!currentItem) {
    return {
      prev: undefined,
      next: undefined
    };
  }

  const index = DATA.findIndex(item => item.slug === slug);

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
        : type === "networking"
          ? NETWORKING_DATA.map(m =>
              m.topics.map(t => ({ ...t, docs: `${m.docs}${t.docs}` }))
            ).flat()
          : type === "system-design"
            ? SYSTEM_DESIGN_DATA
            : SQL_DATA.map(m =>
                m.topics.map(t => ({ ...t, docs: `${m.docs}${t.docs}` }))
              ).flat();

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
