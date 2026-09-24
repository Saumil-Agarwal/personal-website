"use client";

import { useEffect, useState } from "react";

const chapters = [
  { id: "top", label: "Introduction" },
  { id: "about", label: "Systems" },
  { id: "intelligence", label: "Intelligence" },
  { id: "work-jira-github-autopilot", label: "Agentic AI" },
  { id: "work-rdma-qos", label: "Networking" },
  { id: "work-go-security-microservice", label: "Security" },
  { id: "work-tenant-isolation", label: "Isolation" },
  { id: "work-nats-jetstream-telemetry", label: "Telemetry" },
  { id: "work-twofold-editions", label: "Beyond software" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Capabilities" },
  { id: "terminal", label: "The terminal" },
  { id: "ask", label: "Ask about me" },
  { id: "contact", label: "Let's talk" },
];

export function ChapterNavigation() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const root = document.documentElement;
    const elements = chapters.map(({ id }) => document.getElementById(id));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    root.dataset.story = "true";
    const update = () => {
      frame = 0;
      const motion = !reduced.matches && root.dataset.motion !== "paused";
      const viewport = window.innerHeight;
      const bounds = elements.map(element => element?.getBoundingClientRect());
      let index = 0;
      for (let i = 0; i < bounds.length; i++) {
        if (bounds[i] && bounds[i]!.top <= viewport * .42) index = i;
      }
      setActive(previous => previous === index ? previous : index);
      elements.forEach((element, i) => {
        if (!element) return;
        const rect = bounds[i]!;
        const distance = Math.max(-1, Math.min(1, (rect.top - 80) / viewport));
        element.style.setProperty("--chapter-shift", motion ? `${distance * 70}px` : "0px");
        element.style.setProperty("--chapter-turn", motion ? `${distance * -8}deg` : "0deg");
        element.dataset.current = String(i === index);
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const onAnchorClick = (event: globalThis.MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
      const target = anchor && document.getElementById(anchor.hash.slice(1));
      if (!anchor || !target || (!target.classList.contains("story-chapter") && target.id !== "projects")) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "instant", block: "start" });
      window.history.pushState(null, "", anchor.hash);
      anchor.closest("details")?.removeAttribute("open");
      schedule();
    };
    update();
    document.addEventListener("click", onAnchorClick);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("portfolio-motion-change", schedule);
    reduced.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      delete root.dataset.story;
      document.removeEventListener("click", onAnchorClick);
      elements.forEach(element => {
        element?.style.removeProperty("--chapter-shift");
        element?.style.removeProperty("--chapter-turn");
        element?.removeAttribute("data-current");
      });
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("portfolio-motion-change", schedule);
      reduced.removeEventListener("change", schedule);
    };
  }, []);
  const next = chapters[active + 1];
  return <>
    <nav className="chapter-rail" aria-label="Portfolio chapters">
      {chapters.map((chapter, index) => <a href={`#${chapter.id}`} key={chapter.id} aria-label={chapter.label} aria-current={index === active ? "step" : undefined}><span className="chapter-dot" /><span className="chapter-tooltip">{String(index + 1).padStart(2, "0")} / {chapter.label}</span></a>)}
    </nav>
    <div className="chapter-bar">
      <div className="chapter-location"><span className="chapter-count">{String(active + 1).padStart(2, "0")}<span> / {String(chapters.length).padStart(2, "0")}</span></span><span className="chapter-label">{chapters[active].label}</span></div>
      <div className="chapter-progress" aria-hidden="true"><span style={{ transform: `scaleX(${(active + 1) / chapters.length})` }} /></div>
      {next ? <a className="chapter-next" href={`#${next.id}`} aria-label={`Next chapter: ${next.label}`}>Next <span>{next.label}</span><i aria-hidden="true">↓</i></a> : <a className="chapter-next" href="#top">Back to beginning <i aria-hidden="true">↑</i></a>}
    </div>
  </>;
}
