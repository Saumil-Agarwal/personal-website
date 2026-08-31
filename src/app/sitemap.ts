import type { MetadataRoute } from "next";
import { projects } from "@/content/site";

const baseUrl = "https://saumilagarwal.dev";
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: baseUrl, lastModified: new Date() }, ...projects.map((project) => ({ url: `${baseUrl}/projects/${project.slug}`, lastModified: new Date() }))];
}
