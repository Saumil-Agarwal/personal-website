import { describe, expect, it } from "vitest";
import { scriptedProvider } from "./scripted-provider";

describe("scripted portfolio provider", () => {
  it("matches questions case-insensitively using multiple keywords", async () => {
    await expect(scriptedProvider.answer("Tell me about JIRA and AI")).resolves.toMatch(/Autopilot/);
  });
  it("rejects empty questions", async () => {
    await expect(scriptedProvider.answer("  ")).rejects.toThrow(/question/i);
  });
  it("returns a safe fallback for unrelated questions", async () => {
    await expect(scriptedProvider.answer("what is the weather?")).resolves.toMatch(/here's what I know/i);
  });
});
