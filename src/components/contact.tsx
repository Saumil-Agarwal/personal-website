import { profile } from "@/content/site";
import { Section } from "./section";

export function Contact() {
  return <Section id="contact" eyebrow="07 / contact" title="Let’s build something useful.">
    <p className="lede">{profile.availability}</p>
    <div className="actions">
      <a className="button primary" href={`mailto:${profile.email}`} aria-label={`Email ${profile.name}`}>Email Saumil</a>
      <a className="button" href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
      <a className="button" href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a>
      <a className="button" href={profile.resumeUrl} download>Download resume</a>
    </div>
  </Section>;
}
