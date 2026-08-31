import { describe, expect, it } from "vitest";
import { completeCommand, executeCommand } from "./commands";

describe("terminal command registry", () => {
  it("parses whitespace and returns help", () => {
    expect(executeCommand("  help  ").lines?.join(" ")).toMatch(/whoami/);
  });
  it("reports unknown commands", () => {
    expect(executeCommand("nope").lines?.[0]).toMatch(/not found/);
  });
  it.each(["whoami", "projects", "cat skills.txt", "sudo hire-me"])("serves %s from the registry", (input) => {
    expect(executeCommand(input).kind).toBe("text");
  });
  it("returns commands actions without browser effects", () => {
    expect(executeCommand("clear").kind).toBe("clear");
    expect(executeCommand("projects").target).toBe("#projects");
    expect(executeCommand("theme").kind).toBe("theme");
  });
  it("completes only unambiguous command prefixes", () => {
    expect(completeCommand("who")).toBe("whoami");
    expect(completeCommand("c")).toBeNull();
  });
});
