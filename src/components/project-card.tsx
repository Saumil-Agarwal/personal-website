"use client";

import { useCallback, useRef, useState } from "react";
import type { Project } from "@/content/types";
import { AccessibleDialog } from "./accessible-dialog";
import { ProjectVisual } from "./project-visual";

const impacts: Record<string, { value: string; label: string }> = {
  "jira-github-autopilot": { value: "2–3 hours", label: "of repetitive work saved per issue" },
  "rdma-qos": { value: "Lossless.", label: "AI and storage traffic, without sacrificing latency-sensitive workloads" },
  "go-security-microservice": { value: "2h → 30m", label: "a faster build pipeline, with Go at the core" },
  "tenant-isolation": { value: "12 teams.", label: "one platform-wide isolation initiative" },
  "nats-jetstream-telemetry": { value: "Publish once.", label: "independent consumers, working concurrently" },
  "twofold-editions": { value: "Ideas, made.", label: "from a digital design to an object you can hold" },
};

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const [expanded, setExpanded] = useState(false);
  const titleId = `project-${project.slug}-title`;
  const closeRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setExpanded(false), []);

  return (
    <article id={`work-${project.slug}`} className={`project-card story-chapter project-scene-${index}`} aria-labelledby={`work-${project.slug}-title`}>
      <div className="project-chapter-meta"><span>SELECTED WORK / {String(index + 1).padStart(2, "0")}</span><span>{project.tags[0]}</span></div>
      <div className="project-art">
      <ProjectVisual slug={project.slug} />
      </div>
      <div className="project-copy">
      <p className="eyebrow">{project.tags.join(" · ")}</p>
      <h3 id={`work-${project.slug}-title`}>{project.title}</h3>
      <p>{project.blurb}</p>
      {impacts[project.slug] && <div className="project-impact"><strong>{impacts[project.slug].value}</strong><span>{impacts[project.slug].label}</span></div>}
      <div className="project-card-actions"><button
        type="button"
        className="project-toggle"
        aria-haspopup="dialog"
        aria-label={`Quick view: ${project.title}`}
        onClick={() => setExpanded(true)}
      >
        Explore project <span aria-hidden="true">↗</span>
      </button></div>
      </div>
      <noscript><a className="button" href={`/projects/${project.slug}`}>Open project details ↗</a></noscript>
      {expanded && (
        <AccessibleDialog backdropClassName="project-modal-backdrop" panelClassName="project-modal" labelledBy={titleId} onClose={close} initialFocusRef={closeRef}>
            <button ref={closeRef} type="button" className="project-modal-close" aria-label="Close project details" onClick={close}>×</button>
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
        </AccessibleDialog>
      )}
    </article>
  );
}
