"use client";

import { useEffect, useRef } from "react";

const disciplines = [
  { number: "01", title: "Systems", text: "Built for the real world.", detail: "Distributed infrastructure. Reliable telemetry. Performance at scale.", label: "DISTRIBUTED SYSTEMS" },
  { number: "02", title: "Security", text: "Trust, at every layer.", detail: "Network policy. Tenant isolation. Protection woven into the platform.", label: "NETWORK SECURITY" },
  { number: "03", title: "Intelligence", text: "From intent to impact.", detail: "Agentic workflows that connect reasoning, code, testing, and action.", label: "APPLIED AI" },
];

export function ArchitectureScene() {
  const scene = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = scene.current;
    if (!element) return;
    const media = window.matchMedia("(min-width: 761px) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const enabled = media.matches && document.documentElement.dataset.motion !== "paused";
      element.dataset.animated = String(enabled);
      if (!enabled) {
        element.style.removeProperty("--travel");
        element.querySelectorAll<HTMLElement>(".discipline").forEach((item) => item.removeAttribute("aria-current"));
        return;
      }
      const rect = element.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - window.innerHeight)));
      element.style.setProperty("--travel", String(progress));
      const chapter = Math.min(2, Math.floor(progress * 3));
      element.dataset.chapter = String(chapter);
      element.querySelectorAll<HTMLElement>(".discipline").forEach((item, i) => {
        if (i === chapter) item.setAttribute("aria-current", "step");
        else item.removeAttribute("aria-current");
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("portfolio-motion-change", schedule);
    media.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("portfolio-motion-change", schedule);
      media.removeEventListener("change", schedule);
    };
  }, []);

  return <section ref={scene} id="architecture" className="architecture" aria-labelledby="architecture-title">
    <div className="architecture-stage shell">
      <div className="architecture-heading"><p className="eyebrow">THE WAY I BUILD</p><h2 id="architecture-title">Complex beneath.<br /><em>Effortless above.</em></h2></div>
      <div className="architecture-object" aria-hidden="true">
        <div className="object-axis" />
        {[0,1,2].map((layer) => <div className={`architecture-layer layer-${layer}`} key={layer}><div className="layer-grid" /><span>{["SYSTEMS", "SECURITY", "INTELLIGENCE"][layer]}</span><i /><i /><i /><i /></div>)}
        <div className="object-base" />
      </div>
      <div className="disciplines">{disciplines.map((item) => <article className="discipline" key={item.number}>
        <span className="discipline-number">{item.number} / {item.label}</span><h3>{item.title}<span aria-hidden="true">↗</span></h3><p className="discipline-lead">{item.text}</p><p>{item.detail}</p>
      </article>)}</div>
      <div className="architecture-footer" aria-hidden="true"><span>ONE CONNECTED PRACTICE</span><div className="scene-progress"><i /></div><span>SCROLL TO UNFOLD ↓</span></div>
    </div>
  </section>;
}
