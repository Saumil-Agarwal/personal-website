import { projects } from "@/content/site";
import { ProjectCard } from "./project-card";
import { Section } from "./section";

export function Projects() {
  return <Section id="projects" eyebrow="02 / selected work" title="Selected work.">
    <div className="project-grid">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div>
  </Section>;
}
