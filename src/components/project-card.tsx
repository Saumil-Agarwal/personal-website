"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/content/types";
import { ProjectVisual } from "./project-visual";

export function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);
  const titleId = `project-${project.slug}-title`;
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!expanded) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [expanded]);

  return (
    <article className="project-card">
      <ProjectVisual slug={project.slug} />
      <p className="eyebrow">{project.tags.join(" · ")}</p>
      <h3>{project.title}</h3>
      <p>{project.blurb}</p>
      <button
        type="button"
        className="project-toggle"
        aria-haspopup="dialog"
        aria-label={`View project: ${project.title}`}
        onClick={() => setExpanded(true)}
      >
        View project <span aria-hidden="true">↗</span>
      </button>
      {expanded && (
        <div className="project-modal-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setExpanded(false);
        }}>
          <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby={titleId}>
            <button ref={closeRef} type="button" className="project-modal-close" aria-label="Close project details" onClick={() => setExpanded(false)}>×</button>
            <div className="project-modal-visual"><ProjectVisual slug={project.slug} /></div>
            <p className="eyebrow">{project.tags.join(" · ")}</p>
            <h2 id={titleId}>{project.title}</h2>
            <p className="project-modal-blurb">{project.blurb}</p>
            <div className="project-modal-grid">
              <div><h3>Problem</h3><p>{project.details.problem}</p></div>
              <div><h3>Approach</h3><p>{project.details.approach}</p></div>
              <div><h3>Architecture</h3><ul>{project.details.architecture.map((item) => <li key={item}>{item}</li>)}</ul></div>
              <div><h3>Impact</h3><ul>{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></div>
            </div>
            {project.links?.website && <a className="button primary" href={project.links.website} target="_blank" rel="noreferrer">Visit live project ↗</a>}
          </section>
        </div>
      )}
    </article>
  );
}
