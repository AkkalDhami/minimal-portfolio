import { IModule, IDocument } from "@/types/app.types";

type ModuleInput = Omit<IModule, "order" | "topics"> & {
  topics: Omit<IDocument, "module" | "order">[];
};

export function createModules(modules: ModuleInput[]): IModule[] {
  return modules.map((module, moduleIndex) => ({
    ...module,
    order: moduleIndex + 1,
    topics: module.topics.map((topic, topicIndex) => ({
      ...topic,
      module: moduleIndex + 1,
      order: topicIndex + 1
    }))
  }));
}
