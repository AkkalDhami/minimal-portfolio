import { MetadataRoute } from "next";
import { DSA_DATA } from "@/data/dsa";
import { PROJECTS } from "@/data/projects";
import siteConfig from "@/lib/site";
import { PLAYBOOK_DATA } from "@/data/playbook";
import { NETWORKING_DATA } from "@/data/networking";
import { SYSTEM_DESIGN_DATA } from "@/data/system-design";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/projects",
    "/contacts",
    "/dev-setup",
    "/playbook",
    "/templates",
    "/dsa",
    "/networking",
    "/system-design"
  ].map(route => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8
  }));

  const projectRoutes = PROJECTS.map(project => ({
    url: `${siteConfig.url}/projects/${project.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.6
  }));

  const playbookRoutes = PLAYBOOK_DATA.map(item => ({
    url: `${siteConfig.url}${item.docs}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.6
  }));

  const dsaRoutes = DSA_DATA.map(item => ({
    url: `${siteConfig.url}${item.docs}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.6
  }));

  const systemDesignRoutes = SYSTEM_DESIGN_DATA.map(item => ({
    url: `${siteConfig.url}${item.docs}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.6
  }));

  const networkingRoutes = NETWORKING_DATA.map(item => {
    const topics = item.topics;

    return topics.map(topic => ({
      url: `${siteConfig.url}${item.docs}${topic.docs}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.6
    }));
  }).flat();

  return [
    ...routes,
    ...projectRoutes,
    ...playbookRoutes,
    ...dsaRoutes,
    ...systemDesignRoutes,
    ...networkingRoutes
  ];
}
