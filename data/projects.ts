export interface Technology {
  name: string;
}

export interface Project {
  slug: string;
  title: string;
  description?: string;
  technologies: Technology[];
  thumbnail: string;
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
  features: string[];
}

export const PROJECTS: Project[] = [
  {
    slug: "servercn",
    title: "Servercn",
    description:
      "Servercn is a component registry for building Node.js backends by composition.",
    technologies: [
      { name: "Nextjs" },
      { name: "Nodejs" },
      { name: "MongoDB" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" }
    ],
    thumbnail: "/images/servercn.png",
    images: [
      "/images/servercn.png",
      "/images/servercn.png",
      "/images/servercn.png",
      "/images/servercn.png",
      "/images/servercn.png"
    ],
    liveUrl: "https://servercn.vercel.app",
    githubUrl: "https://github.com/akkaldhami/servercn",
    features: [
      "Component-First Backend",
      "CLI-First Workflow",
      "Architecture-Aware",
      "Production-Ready by Default",
      "Database-Aware Setup",
      "Transparent & Documented",
      "Dependency-Safe Installs"
    ]
  }
];
