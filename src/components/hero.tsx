import { type ReactNode } from "react";
import { profile } from "@/content/site";

export function Hero({ children }: { children?: ReactNode }) {
  return (
    <header id="top" className="hero shell">
      <div className="hero-copy">
        <p className="prompt">
          saumil@agarwal:~$ <span>whoami</span>
        </p>
        <h1>{profile.name}</h1>
        <p className="tagline">
          <span data-testid="hero-tagline">{profile.tagline}</span>
        </p>
        <p className="lede">{profile.summary}</p>
        <div className="actions">
          <a className="button primary" href="#projects">
            View projects
          </a>
          <a className="button" href="#ask">
            Explore the portfolio
          </a>
          <a className="button" href={profile.resumeUrl} download>
            Resume
          </a>
        </div>
        <ul className="proof-strip" aria-label="Career highlights"><li><strong>4+ years</strong><span>production ownership</span></li><li><strong>12 teams coordinated</strong><span>platform delivery</span></li><li><strong>4× faster</strong><span>build pipeline</span></li><li><strong>2–3 hours saved</strong><span>per engineering issue</span></li></ul>
      </div>
      {children}
    </header>
  );
}
