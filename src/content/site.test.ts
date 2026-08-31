import { describe, expect, it } from "vitest";
import { profile, projects, qa } from "./site";

describe("portfolio content contract", () => {
  it("provides a contactable profile with a resume", () => {
    expect(profile.email).toContain("@");
    expect(profile.resumeUrl).toMatch(/^\/.*\.pdf$/);
    expect(profile.links.github).toMatch(/^https:\/\//);
    expect(profile.links.linkedin).toMatch(/^https:\/\//);
  });

  it("has unique project slugs and complete featured work", () => {
    expect(new Set(projects.map((project) => project.slug)).size).toBe(
      projects.length,
    );
    expect(
      projects
        .filter((project) => project.featured)
        .every((project) => project.highlights.length > 0),
    ).toBe(true);
  });

  it("uses HTTPS for every external project URL", () => {
    for (const project of projects) {
      for (const url of Object.values(project.links ?? {})) {
        expect(url).toMatch(/^https:\/\//);
      }
    }
  });

  it("keeps AI keywords curated and non-empty", () => {
    expect(qa).not.toHaveLength(0);
    expect(qa.every((entry) => entry.keywords.length > 0)).toBe(true);
  });
});
