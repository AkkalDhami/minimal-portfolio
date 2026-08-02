import { IPlaybook } from "@/types/app.types";

const SYSTEM_DESIGN_URL = "/docs/system-design";

export const SYSTEM_DESIGN_DATA = [
  {
    slug: "getting-started",
    title: "Getting Started",
    description:
      "Get started with system design by learning the basics of system design.",
    docs: `${SYSTEM_DESIGN_URL}/getting-started`
  }
] satisfies IPlaybook[];
