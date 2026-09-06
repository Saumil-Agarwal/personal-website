import { education, experience } from "@/content/site";
import { Section } from "./section";

export function ExperienceTimeline() {
  return <Section id="experience" eyebrow="03 / experience" title="Production systems, end to end.">
    <ol className="timeline">{experience.map((role) => <li key={`${role.company}-${role.role}`}>
      <div><strong>{role.role}</strong><span>{role.company} · {role.location}</span></div>
      <time>{role.period}</time><ul>{role.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
    </li>)}</ol>
    <div className="education-card"><p className="eyebrow">Education</p>{education.map((item) => <div key={item.institution}><strong>{item.institution}</strong><p>{item.qualification}</p><p>{item.period} · {item.detail}</p></div>)}</div>
  </Section>;
}
