import type { Metadata } from "next";
import { profile, projects } from "@/content/site";

export function projectParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export function projectMetadata(slug: string): Metadata | undefined {
  const project = projects.find((candidate) => candidate.slug === slug);
  return project
    ? {
        title: `${project.title} | ${profile.name}`,
        description: project.blurb,
        alternates: { canonical: `/projects/${project.slug}` },
      }
    : undefined;
}
