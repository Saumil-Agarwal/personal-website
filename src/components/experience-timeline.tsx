import { experience } from "@/content/site";
import { Section } from "./section";

export function ExperienceTimeline() {
  return <Section id="experience" eyebrow="02 / experience" title="Production systems, end to end.">
    <ol className="timeline">{experience.map((role) => <li key={`${role.company}-${role.role}`}>
      <div><strong>{role.role}</strong><span>{role.company} · {role.location}</span></div>
      <time>{role.period}</time><ul>{role.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
    </li>)}</ol>
  </Section>;
}
