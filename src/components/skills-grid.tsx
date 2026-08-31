import { skillGroups } from "@/content/site";
import { Section } from "./section";

export function SkillsGrid() {
  return <Section id="skills" eyebrow="04 / toolkit" title="$ cat skills.txt">
    <div className="skills-grid">{skillGroups.map((group) => <div key={group.name}><h3>{group.name}</h3><ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></div>)}</div>
  </Section>;
}
