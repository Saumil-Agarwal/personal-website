"use client";

import type { CommandResult } from "./types";

export function toggleTheme() {
  const nextTheme =
    document.documentElement.dataset.theme === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = nextTheme;
  window.localStorage?.setItem("saumil-theme", nextTheme);
}

export function applyCommandResult(result: CommandResult) {
  if (result.kind === "theme") {
    toggleTheme();
    return;
  }

  if (result.target?.startsWith("#")) {
    document.querySelector(result.target)?.scrollIntoView({ behavior: "smooth" });
  }

  if (result.target?.endsWith(".pdf")) {
    window.open(result.target, "_blank", "noopener,noreferrer");
  }
}
