export interface IStack {
  label: string;
  value: string;
  category: string;
}

export interface ICategory {
  title: string;
  description: string;
  stacks: IStack[];
}

export const STACKS: IStack[] = [
  {
    label: "Next.js",
    value: "nextjs",
    category: "frontend"
  },
  {
    label: "TypeScript",
    value: "typescript",
    category: "frontend"
  },
  {
    label: "React.js",
    value: "react",
    category: "frontend"
  },
  {
    label: "JavaScript",
    value: "javascript",
    category: "frontend"
  },
  {
    label: "Tailwind CSS",
    value: "tailwind",
    category: "frontend"
  },
  {
    label: "TanStack Query",
    value: "tanstackquery",
    category: "frontend"
  },
  {
    label: "Redux Toolkit",
    value: "redux",
    category: "frontend"
  },
  {
    label: "Motion",
    value: "motion",
    category: "frontend"
  },
  {
    label: "ZOD",
    value: "zod",
    category: "frontend"
  },
  {
    label: "Shadcn/ui",
    value: "shadcnui",
    category: "frontend"
  },
  {
    label: "MySQL",
    value: "mysql",
    category: "database"
  },
  {
    label: "MongoDB",
    value: "mongodb",
    category: "database"
  },
  {
    label: "PostgreSQL",
    value: "postgresql",
    category: "database"
  },
  {
    label: "Redis",
    value: "redis",
    category: "database"
  },
  {
    label: "Node.js",
    value: "nodejs",
    category: "backend"
  },
  {
    label: "Express.js",
    value: "expressjs",
    category: "backend"
  },
  {
    label: "Nest.js",
    value: "nestjs",
    category: "backend"
  },
  {
    label: "Nginx",
    value: "nginx",
    category: "backend"
  },
  {
    label: "Drizzle ORM",
    value: "drizzle",
    category: "backend"
  },
  {
    label: "Git",
    value: "git",
    category: "tools"
  },
  {
    label: "GitHub",
    value: "github",
    category: "tools"
  },
  {
    label: "Docker",
    value: "docker",
    category: "tools"
  },
  {
    label: "Vercel",
    value: "vercel",
    category: "tools"
  },
  {
    label: "Postman",
    value: "postman",
    category: "tools"
  },
  {
    label: "Figma",
    value: "figma",
    category: "tools"
  },
  {
    label: "VSCode",
    value: "vscode",
    category: "tools"
  },
  {
    label: "ChatGPT",
    value: "chatgpt",
    category: "tools"
  },
  {
    label: "Claude",
    value: "claude",
    category: "tools"
  },
  {
    label: "Cursor",
    value: "cursor",
    category: "tools"
  },
  {
    label: "ESLint",
    value: "eslint",
    category: "tools"
  },
  {
    label: "Prettier",
    value: "prettier",
    category: "tools"
  },
  {
    label: "NPM",
    value: "npm",
    category: "tools"
  }
];

export const HOME_PAGE_STACKS = STACKS.filter(stack =>
  ["nextjs", "typescript", "tailwind", "nodejs", "mongodb", "mysql"].includes(
    stack.value
  )
);

export const FRONTEND_STACKS = STACKS.filter(
  stack => stack.category === "frontend"
);

export const BACKEND_STACKS = STACKS.filter(
  stack => stack.category === "backend"
);

export const DATABASE_STACKS = STACKS.filter(
  stack => stack.category === "database"
);

export const TOOLS_STACKS = STACKS.filter(stack => stack.category === "tools");
