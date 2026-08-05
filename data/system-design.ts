import { IPlaybook } from "@/types/app.types";

const SYSTEM_DESIGN_URL = "/docs/system-design";

export const SYSTEM_DESIGN_DATA = [
  {
    slug: "getting-started",
    title: "Getting Started",
    description:
      "Get started with system design by learning the basics of system design.",
    docs: `${SYSTEM_DESIGN_URL}/getting-started`
  },
  {
    slug: "magic-of-dns",
    title: "The Magic of DNS - How Does The Internet Work?",
    description:
      "DNS internals, resolution flow, and internet fundamentals from a system design perspective, with interview questions.",
    docs: `${SYSTEM_DESIGN_URL}/magic-of-dns`
  }
  // {
  //   slug: "load-balancing",
  //   title: "Load Balancing - Distributing Traffic the Right Way",
  //   description:
  //     "How load balancers sit between users and servers, the algorithms they use, L4 vs L7, health checks, sticky sessions, and the trade-offs that come up in real systems.",
  //   docs: `${SYSTEM_DESIGN_URL}/load-balancing`
  // }
] satisfies IPlaybook[];
