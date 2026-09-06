"use client";

import { useEffect, useState } from "react";
import { toggleTheme } from "@/features/terminal/result-handler";

export function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);
  useEffect(() => {
    const saved = window.localStorage?.getItem("saumil-theme");
    const nextDark = saved !== "light";
    document.documentElement.dataset.theme = nextDark ? "dark" : "light";
    const timer = window.setTimeout(() => setIsLight(!nextDark), 0);
    return () => window.clearTimeout(timer);
  }, []);
  return <button className="icon-button" onClick={() => { toggleTheme(); setIsLight(document.documentElement.dataset.theme === "light"); }} aria-label="Toggle color theme" aria-pressed={isLight} title={`Switch to ${isLight ? "dark" : "light"} theme`}>◐</button>;
}
