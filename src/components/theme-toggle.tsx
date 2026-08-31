"use client";

import { useEffect } from "react";
import { toggleTheme } from "@/features/terminal/result-handler";

export function ThemeToggle() {
  useEffect(() => {
    const saved = window.localStorage?.getItem("saumil-theme");
    const nextDark = saved !== "light";
    document.documentElement.dataset.theme = nextDark ? "dark" : "light";
  }, []);
  return <button className="icon-button" onClick={toggleTheme} aria-label="Toggle color theme">◐</button>;
}
