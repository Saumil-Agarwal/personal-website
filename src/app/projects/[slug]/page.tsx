import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { profile, projects } from "@/content/site";

export function projectParams() { return projects.map(({ slug }) => ({ slug })); }
export function projectMetadata(slug: string): Metadata | undefined {
  const project = projects.find((candidate) => candidate.slug === slug);
  return project ? { title: `${project.title} | ${profile.name}`, description: project.blurb, alternates: { canonical: `/projects/${project.slug}` } } : undefined;
}
export const generateStaticParams = projectParams;
export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  return projectMetadata((await params).slug) ?? {};
}
export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = projects.find((candidate) => candidate.slug === slug);
  if (!project) notFound();
  return <main className="shell project-page"><Link href="/">← Back to portfolio</Link><p className="eyebrow">{project.tags.join(" · ")}</p><h1>{project.title}</h1><p className="lede">{project.blurb}</p><ul>{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>{project.links?.website && <a className="button primary" href={project.links.website} target="_blank" rel="noreferrer">Visit project (opens in new tab)</a>}</main>;
}
