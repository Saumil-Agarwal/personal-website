import { profile } from "@/content/site";
import { Section } from "./section";

export function About() {
  return <Section id="about" eyebrow="01 / about" title="A systems engineer with an applied-AI lens.">
    <div className="prose"><p>{profile.summary}</p><p><span className="accent">Beyond the terminal</span> {profile.interests}</p></div>
  </Section>;
}
