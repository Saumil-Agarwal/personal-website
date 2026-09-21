import { type ReactNode } from "react";
import { profile } from "@/content/site";

export function Hero({ children }: { children?: ReactNode }) {
  return (
    <header id="top" className="hero shell story-chapter">
      <div className="hero-meta"><span><i className="status-light" /> ENGINEER BY TRADE. BUILDER BY INSTINCT.</span><span>BENGALURU, INDIA / 12.97° N</span></div>
      <div className="hero-stage">
        <div className="hero-copy">
          <p className="eyebrow">Systems. Security. A little intelligence.</p>
          <h1 aria-label={profile.name}>SAUMIL<span className="name-second">AGARWAL<span className="name-star" aria-hidden="true">✳</span></span></h1>
          <p className="hero-statement">Turning complex ideas<br />into <em>working reality.</em></p>
          <p className="lede">I build systems that scale, security that holds, and AI that does real work.</p>
          <p className="sr-only" data-testid="hero-tagline">{profile.tagline}</p>
          <div className="actions">
            <a className="button primary" href="#projects">View projects <span aria-hidden="true">↗</span></a>
            <a className="button" href="#ask">Explore the portfolio</a>
            <a className="hero-resume" href={profile.resumeUrl} download>Resume <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div className="hero-universe">{children}<span className="orbit-word orbit-word-one" aria-hidden="true">HUMAN INTENT</span><span className="orbit-word orbit-word-two" aria-hidden="true">MACHINE POSSIBILITY</span></div>
      </div>
      <div className="hero-bottom"><a href="#about">ONE SCROLL. A NEW PERSPECTIVE. <span aria-hidden="true">↓</span></a><span>SELECTED WORK & EXPERIMENTS / 2026</span></div>
    </header>
  );
}
