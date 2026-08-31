import Link from "next/link";
import type { Project } from "@/content/types";

export function ProjectCard({ project }: { project: Project }) {
  return <article className="project-card">
    <p className="eyebrow">{project.tags.join(" · ")}</p><h3>{project.title}</h3><p>{project.blurb}</p>
    <ul>{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
    <Link href={`/projects/${project.slug}`} aria-label={`View project: ${project.title}`}>View project <span aria-hidden="true">↗</span></Link>
  </article>;
}
