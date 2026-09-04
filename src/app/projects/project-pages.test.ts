import { describe, expect, it } from "vitest";
import { projectMetadata, projectParams } from "./project-data";
import { projects } from "@/content/site";

describe("project route data", () => {
  it("creates one static route per content project", () => {
    expect(projectParams()).toEqual(projects.map(({ slug }) => ({ slug })));
  });
  it("creates metadata for known projects and rejects unknown ones", () => {
    expect(projectMetadata(projects[0].slug)?.title).toContain(projects[0].title);
    expect(projectMetadata("missing")).toBeUndefined();
  });
});
