import { expect, it, vi } from "vitest";
import { applyCommandResult } from "./result-handler";

it("persists a shared theme toggle result", () => {
  document.documentElement.dataset.theme = "dark";

  applyCommandResult({ kind: "theme" });

  expect(document.documentElement.dataset.theme).toBe("light");
  expect(window.localStorage.getItem("saumil-theme")).toBe("light");
});

it("scrolls navigation results to their target", () => {
  const target = document.createElement("section");
  target.id = "projects";
  target.scrollIntoView = vi.fn();
  document.body.append(target);

  applyCommandResult({ kind: "navigate", target: "#projects" });

  expect(target.scrollIntoView).toHaveBeenCalled();
  target.remove();
});

it("opens the resume in a new tab without replacing the portfolio", () => {
  const open = vi.spyOn(window, "open").mockReturnValue(null);

  applyCommandResult({ kind: "navigate", target: "/saumil-agarwal-resume.pdf" });

  expect(open).toHaveBeenCalledWith("/saumil-agarwal-resume.pdf", "_blank", "noopener,noreferrer");
  open.mockRestore();
});
