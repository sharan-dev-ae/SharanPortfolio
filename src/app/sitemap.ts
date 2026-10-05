import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/",
    "/about",
    "/career",
    "/projects",
    "/contact",
    ...projects
      .filter((project) => project.featured)
      .map(({ slug }) => `/projects/${slug}`),
  ].map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
  }));
}
