import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { HeroArtwork } from "@/components/hero-artwork";
import { Nav } from "@/components/nav";
import { Projects } from "@/components/projects";
import { SkillsGrid } from "@/components/skills-grid";
import { AiChat } from "@/features/ai/ai-chat";
import { CommandPalette } from "@/features/command-palette/command-palette";
import { Terminal } from "@/features/terminal/terminal";

export default function Home() {
  return (
    <>
      <header className="site-header">
        <Nav />
      </header>
      <main>
        <Hero>
          <HeroArtwork />
        </Hero>
        <div className="shell">
          <About />
          <ExperienceTimeline />
          <Projects />
          <SkillsGrid />
          <section id="terminal" className="section" aria-labelledby="terminal-title">
            <p className="eyebrow">05 / terminal</p>
            <h2 id="terminal-title">A shortcut to the details.</h2>
            <Terminal />
          </section>
          <section id="ask" className="section" aria-labelledby="ask-title">
            <p className="eyebrow">06 / ask</p>
            <h2 id="ask-title">Ask me anything about Saumil.</h2>
            <AiChat />
          </section>
          <Contact />
        </div>
      </main>
      <Footer />
      <CommandPalette />
    </>
  );
}
