import { type ReactNode } from "react";
import { profile } from "@/content/site";

export function Hero({ children }: { children?: ReactNode }) {
  return (
    <header id="top" className="hero shell">
      <div className="hero-meta"><span><i className="status-light" /> ENGINEER · BUILDER · EXPLORER</span><span>BENGALURU, INDIA / 12.97° N</span></div>
      <h1 aria-label={profile.name}>SAUMIL<span className="name-second">AGARWAL<span className="name-star" aria-hidden="true">✳</span></span></h1>
      <div className="hero-stage">
        <div className="hero-copy">
          <p className="eyebrow">Human curiosity. Machine possibility.</p>
          <p className="hero-statement">Engineering the<br /><em>intelligent</em> edge.</p>
          <p className="lede">I build systems that scale, security that holds, and AI that does real work.</p>
          <p className="sr-only" data-testid="hero-tagline">{profile.tagline}</p>
          <div className="actions">
            <a className="button primary" href="#projects">View projects <span aria-hidden="true">↗</span></a>
            <a className="button" href="#ask">Explore the portfolio</a>
            <a className="hero-resume" href={profile.resumeUrl} download>Resume <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        {children}
      </div>
      <div className="hero-bottom"><a href="#architecture">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a><span>SYSTEMS / SECURITY / APPLIED AI</span><span>PORTFOLIO — 2026</span></div>
    </header>
  );
}
