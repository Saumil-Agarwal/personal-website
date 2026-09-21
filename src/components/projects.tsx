import { projects } from "@/content/site";
import { ProjectCard } from "./project-card";

export function Projects() {
  return <section id="projects" className="story-projects" aria-labelledby="projects-title">
    <h2 id="projects-title" className="sr-only">Selected work.</h2>
    <div className="project-grid">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div>
  </section>;
}
