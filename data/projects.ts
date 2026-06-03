import { GITHUB_URL } from "@/lib/constants";
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
  status?: "completed" | "ongoing";
}

export const PROJECTS: Project[] = [
  {
    slug: "servercn",
    title: "Servercn",
    description:
      "Servercn is a component registry for building Node.js backends by composition. Shadcn ecosystem for node.js backends. Open Source.",
    technologies: [
      { name: "Nextjs" },
      { name: "Nodejs" },
      { name: "MongoDB" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "Shadcn" }
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
  },
  {
    slug: "discord-clone",
    title: "Discord Clone",
    status: "ongoing",
    description:
      "A real-time Discord-inspired chat application with servers, channels, and instant messaging powered by Socket.io and a scalable backend architecture.",

    technologies: [
      { name: "Nextjs" },
      { name: "Nodejs" },
      { name: "MongoDB" },
      { name: "Redis" },
      { name: "TypeScript" },
      { name: "Socket.io" },
      { name: "Tailwind CSS" },
      { name: "Shadcn" }
    ],

    thumbnail: "/assets/projects/discord6.png",

    images: [
      "/assets/projects/discord6.png",
      "/assets/projects/discord1.png",
      "/assets/projects/discord2.png",
      "/assets/projects/discord3.png",
      "/assets/projects/discord4.png",
      "/assets/projects/discord5.png"
    ],

    liveUrl: "https://discordbyakkal.vercel.app",
    githubUrl: `${GITHUB_URL}/discord-clone`,

    features: [
      "Real-time Messaging with Socket.io",
      "Server & Channel System",
      "Typing Indicators",
      "Online/Offline Presence",
      "Unread Message Tracking",
      "Optimistic UI Updates",
      "Scalable Backend Architecture",
      "Responsive Discord-like UI",
      "Authentication & User Sessions"
    ]
  }
];
