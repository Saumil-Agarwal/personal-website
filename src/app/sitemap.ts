import type { MetadataRoute } from "next";
import { projects } from "@/content/site";

const baseUrl = "https://saumilagarwal.dev";
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: baseUrl }, ...projects.map((project) => ({ url: `${baseUrl}/projects/${project.slug}` }))];
}
