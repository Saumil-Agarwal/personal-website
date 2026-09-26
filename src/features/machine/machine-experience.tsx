"use client";

import { useEffect, useRef } from "react";
import { drawMachine } from "./renderer";
import { sceneAtScroll } from "./scroll-scene";

const anchors = ["top", "about", "intelligence", "work-jira-github-autopilot", "work-rdma-qos", "work-go-security-microservice", "work-tenant-isolation", "work-nats-jetstream-telemetry", "work-twofold-editions", "experience"];

export function MachineExperience() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    // A failed canvas leaves the server-rendered illustrations and normal layout intact.
    if (!canvas || typeof ResizeObserver === "undefined") return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements = anchors.map(id => document.getElementById(id));
    const panels = [...document.querySelectorAll<HTMLElement>(".machine-panel")];
    let positions: number[] = [];
    let width = 0, height = 0, frame = 0, progress = 0;
    let alive = true;
    const paused = () => root.dataset.motion === "paused";
    const render = () => {
      frame = 0;
      if (document.hidden) return;
      if (!paused()) progress = sceneAtScroll(window.scrollY, positions);
      const scene = reduced.matches ? Math.floor(progress) : progress;
      drawMachine(ctx, width, height, scene, root.dataset.theme === "light");
      canvas.dataset.scene = scene.toFixed(3);
      // The machine recedes behind longer reading sections after the case studies.
      const end = positions[positions.length - 1] ?? Infinity;
      canvas.style.opacity = String(Math.max(.09, 1 - Math.max(0, window.scrollY - end + height * .3) / height));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(render); };
    const measure = () => {
      width = window.innerWidth; height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const inset = parseFloat(getComputedStyle(root).scrollPaddingTop) || 80;
      const barHeight = document.querySelector(".chapter-bar")?.getBoundingClientRect().height ?? 64;
      // Pin only when all of the panel fits between the navigation bars. This
      // also handles larger text and translated/wrapped content, not just devices.
      const available = height - inset - barHeight;
      const fits = panels.map(panel => panel.getBoundingClientRect().height <= available + 2);
      panels.forEach((panel, index) => {
        if (panel.parentElement) panel.parentElement.dataset.unpinned = String(!fits[index]);
      });
      positions = elements.map(element => Math.max(0, (element?.getBoundingClientRect().top ?? 0) + window.scrollY - inset));
      schedule();
    };
    root.dataset.machine = "true";
    const resize = new ResizeObserver(measure);
    resize.observe(document.body);
    panels.forEach(panel => resize.observe(panel));
    const theme = new MutationObserver(schedule);
    theme.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    measure();
    document.fonts.ready.then(() => { if (alive) measure(); });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("portfolio-motion-change", schedule);
    document.addEventListener("visibilitychange", schedule);
    reduced.addEventListener("change", measure);
    return () => {
      alive = false; cancelAnimationFrame(frame); resize.disconnect(); theme.disconnect();
      delete root.dataset.machine;
      panels.forEach(panel => { if (panel.parentElement) delete panel.parentElement.dataset.unpinned; });
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      window.removeEventListener("portfolio-motion-change", schedule);
      document.removeEventListener("visibilitychange", schedule);
      reduced.removeEventListener("change", measure);
    };
  }, []);
  return <div className="machine-world" aria-hidden="true"><canvas ref={canvasRef} className="machine-canvas" /><div className="machine-vignette" /></div>;
}
