"use client";

import { ThemeToggle } from "./theme-toggle";

export function Nav() {
  return (
    <nav aria-label="Primary" className="nav shell">
      <a className="wordmark" href="#top">saumil@agarwal:~$</a>
      <details className="mobile-nav"><summary>Menu</summary><div><a href="#projects">Projects</a><a href="#experience">Experience</a><a href="#contact">Contact</a></div></details>
      <div className="nav-links">
        <a href="#projects">Projects</a>
        <a href="#experience">Experience</a>
        <a href="#contact">Contact</a>
        <button className="shortcut" type="button" aria-label="Open command palette" title="Open command palette (Ctrl or Command + K)" onClick={() => window.dispatchEvent(new Event("open-command-palette"))}>Ctrl/⌘ K</button>
        <ThemeToggle />
      </div>
    </nav>
  );
}
