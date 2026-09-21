"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  window.addEventListener("portfolio-motion-change", onChange);
  return () => window.removeEventListener("portfolio-motion-change", onChange);
}
const getSnapshot = () => document.documentElement.dataset.motion === "paused";
const getServerSnapshot = () => false;

export function MotionControls() {
  const paused = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  function toggle() {
    const next = !paused;
    document.documentElement.dataset.motion = next ? "paused" : "playing";
    window.dispatchEvent(new Event("portfolio-motion-change"));
  }
  return <button className="motion-control" type="button" aria-pressed={paused} onClick={toggle} aria-label={paused ? "Resume animations" : "Pause animations"}><span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span><span>{paused ? "Motion off" : "Motion on"}</span></button>;
}
