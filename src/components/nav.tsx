"use client";

import { ThemeToggle } from "./theme-toggle";

export function Nav() {
  return (
    <nav aria-label="Primary" className="nav shell">
      <a className="wordmark" href="#top">saumil@agarwal:~$</a>
      <div className="nav-links">
        <a href="#projects">Projects</a>
        <a href="#experience">Experience</a>
        <a href="#contact">Contact</a>
        <button className="shortcut" type="button" aria-label="Open command palette" onClick={() => window.dispatchEvent(new Event("open-command-palette"))}>⌘K</button>
        <ThemeToggle />
      </div>
    </nav>
  );
}
