import type { Metadata } from "next";
import { projects } from "@/content/site";

export function projectParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export function projectMetadata(slug: string): Metadata | undefined {
  const project = projects.find((candidate) => candidate.slug === slug);
  return project
    ? {
        title: project.title,
        description: project.blurb,
        alternates: { canonical: `/projects/${project.slug}` },
        openGraph: { title: project.title, description: project.blurb, url: `/projects/${project.slug}`, type: "article" },
        twitter: { card: "summary_large_image", title: project.title, description: project.blurb },
      }
    : undefined;
}
