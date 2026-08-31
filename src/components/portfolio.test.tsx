import { render, screen } from "@testing-library/react";
import { act } from "react";
import { vi } from "vitest";
import Home from "@/app/page";
import { Hero } from "./hero";

describe("portfolio home", () => {
  it("renders a single clear heading and navigable portfolio landmarks", () => {
    render(<Home />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("navigation", { name: /primary/i })).toBeVisible();
    expect(screen.getByRole("main")).toBeVisible();
    expect(screen.getByRole("contentinfo")).toBeVisible();
  });

  it("exposes every primary portfolio section and key links", () => {
    render(<Home />);

    for (const id of [
      "about",
      "experience",
      "projects",
      "skills",
      "terminal",
      "ask",
      "contact",
    ]) {
      expect(document.getElementById(id)).toBeTruthy();
    }

    expect(screen.getAllByRole("link", { name: /view project/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /download resume/i })).toHaveAttribute(
      "href",
      "/saumil-agarwal-resume.pdf",
    );
    expect(screen.getByRole("link", { name: /email saumil/i })).toHaveAttribute(
      "href",
      expect.stringContaining("mailto:"),
    );
  });

  it("streams the hero tagline and completes it", () => {
    vi.useFakeTimers();
    render(<Hero />);

    expect(screen.getByTestId("hero-tagline")).toHaveTextContent(/^$/);

    act(() => vi.advanceTimersByTime(2_000));
    expect(screen.getByTestId("hero-tagline")).toHaveTextContent(
      /Member of Technical Staff/,
    );
    vi.useRealTimers();
  });
});
