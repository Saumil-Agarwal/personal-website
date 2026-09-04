"use client";

import { useState } from "react";
import type { Project } from "@/content/types";
import { ProjectVisual } from "./project-visual";

export function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);
  const detailsId = `project-${project.slug}-details`;

  return (
    <article className="project-card">
      <ProjectVisual slug={project.slug} />
      <p className="eyebrow">{project.tags.join(" · ")}</p>
      <h3>{project.title}</h3>
      <p>{project.blurb}</p>
      {expanded && (
        <div id={detailsId} className="project-details">
          <ul>
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
          {project.links?.website && (
            <a href={project.links.website} target="_blank" rel="noreferrer">
              Visit live project <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      )}
      <button
        type="button"
        className="project-toggle"
        aria-expanded={expanded}
        aria-controls={detailsId}
        aria-label={`${expanded ? "Hide" : "View"} project: ${project.title}`}
        onClick={() => setExpanded((value) => !value)}
      >
        {expanded ? "Hide project" : "View project"} <span aria-hidden="true">{expanded ? "↑" : "+"}</span>
      </button>
    </article>
  );
}
