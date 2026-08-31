import { projects } from "@/content/site";
import { ProjectCard } from "./project-card";
import { Section } from "./section";

export function Projects() {
  return <Section id="projects" eyebrow="03 / selected work" title="Systems that make teams faster.">
    <div className="project-grid">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div>
  </Section>;
}
