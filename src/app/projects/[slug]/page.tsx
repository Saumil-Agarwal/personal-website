import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/site";
import { ProjectVisual } from "@/components/project-visual";
import { projectMetadata, projectParams } from "../project-data";

export const generateStaticParams = projectParams;
export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  return projectMetadata((await params).slug) ?? {};
}
export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = projects.find((candidate) => candidate.slug === slug);
  if (!project) notFound();
  const index = projects.findIndex((candidate) => candidate.slug === slug);
  const nextProject = projects[(index + 1) % projects.length];
  return <><header className="site-header"><nav className="nav shell" aria-label="Project"><Link className="wordmark" href="/">saumil@agarwal:~$</Link><Link href="/#projects">All projects</Link></nav></header><main className="shell project-page" id="main-content"><Link href="/#projects">← Back to selected work</Link><p className="eyebrow">{project.tags.join(" · ")}</p><h1>{project.title}</h1><p className="lede">{project.blurb}</p><ProjectVisual slug={project.slug}/><div className="case-study-grid"><section><h2>Problem</h2><p>{project.details.problem}</p></section><section><h2>Approach</h2><p>{project.details.approach}</p></section><section><h2>Architecture</h2><ul>{project.details.architecture.map((item) => <li key={item}>{item}</li>)}</ul></section><section><h2>Impact</h2><ul>{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></section></div>{project.links?.website && <a className="button primary" href={project.links.website} target="_blank" rel="noreferrer">Visit live project ↗</a>}<aside className="case-study-next"><p className="eyebrow">Continue exploring</p><Link href={`/projects/${nextProject.slug}`}>Next: {nextProject.title} →</Link><a href="mailto:saumil.agarwal.28@gmail.com">Discuss systems or applied-AI work →</a></aside></main></>;
}
