"use client";

import { type ReactNode, useEffect, useState } from "react";
import { profile } from "@/content/site";

export function Hero({ children }: { children?: ReactNode }) {
  const [tagline, setTagline] = useState("");

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      const timer = window.setTimeout(() => setTagline(profile.tagline), 0);
      return () => window.clearTimeout(timer);
    }

    let position = 0;
    let timer: number;

    function type() {
      position += 1;
      setTagline(profile.tagline.slice(0, position));
      const complete = position >= profile.tagline.length;
      timer = window.setTimeout(complete ? erase : type, complete ? 4_000 : 18);
    }

    function erase() {
      position -= 1;
      setTagline(profile.tagline.slice(0, position));
      const empty = position <= 0;
      timer = window.setTimeout(empty ? type : erase, empty ? 900 : 10);
    }

    timer = window.setTimeout(type, 18);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <header id="top" className="hero shell">
      <div className="hero-copy">
        <p className="prompt">
          saumil@agarwal:~$ <span>whoami</span>
        </p>
        <h1>{profile.name}</h1>
        <p className="tagline">
          <span data-testid="hero-tagline">{tagline}</span>
          <span className="caret" aria-hidden="true">▋</span>
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
      </div>
      {children}
    </header>
  );
}
