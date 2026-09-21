import { profile } from "@/content/site";

export function About() {
  return <section id="about" className="section story-chapter philosophy" aria-labelledby="about-title">
    <div className="philosophy-copy"><p className="eyebrow">01 / THE THREAD THROUGH EVERYTHING</p><h2 id="about-title">Make it useful.<br /><em>Make it matter.</em></h2><div className="prose"><p>{profile.summary}</p><p><span className="accent">Beyond the terminal</span> {profile.interests}</p></div></div>
    <div className="philosophy-visual" aria-hidden="true"><div className="idea-ring ring-one" /><div className="idea-ring ring-two" /><div className="idea-ring ring-three" /><div className="idea-center">WHY<span>before how.</span></div><span className="idea-label label-one">CURIOSITY</span><span className="idea-label label-two">CRAFT</span><span className="idea-label label-three">IMPACT</span></div>
    <div className="philosophy-principles"><span><b>01</b> Think in systems.</span><span><b>02</b> Build for people.</span><span><b>03</b> Finish the last mile.</span></div>
  </section>;
}
