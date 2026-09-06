import { education, experience } from "@/content/site";
import { Section } from "./section";

export function ExperienceTimeline() {
  const professionalRoles = experience.filter((role) => role.company !== "Twofold Editions");
  const ventures = experience.filter((role) => role.company === "Twofold Editions");
  return <Section id="experience" eyebrow="03 / experience" title="Production systems, end to end.">
    <ol className="timeline">{professionalRoles.map((role) => <li key={`${role.company}-${role.role}`}>
      <div><strong>{role.role}</strong><span>{role.company} · {role.location}</span></div>
      <time>{role.period}</time><ul>{role.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
    </li>)}</ol>
    <div className="experience-support"><div><p className="eyebrow">Concurrent venture</p>{ventures.map((role) => <div key={role.company}><strong>{role.role} · {role.company}</strong><p>{role.period} · {role.location}</p><p>{role.highlights[0]}</p></div>)}</div><div><p className="eyebrow">Education</p>{education.map((item) => <div key={item.institution}><strong>{item.institution}</strong><p>{item.qualification}</p><p>{item.period} · {item.detail}</p></div>)}</div></div>
  </Section>;
}
