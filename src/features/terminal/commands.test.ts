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

  it("lets every root ls entry be read or entered", () => {
    expect(executeCommand("cat about.md").lines?.join(" ")).toContain("production systems");
    expect(executeCommand("cat experience.log").lines?.join(" ")).toContain("Nutanix");
    expect(executeCommand("cat contact.txt").lines?.join(" ")).toContain("@gmail.com");
    expect(executeCommand("cd projects").cwd).toBe("/projects");
  });

  it("lists and reads project files from the projects directory", () => {
    expect(executeCommand("ls", "/projects").lines).toContain("jira-github-autopilot.md");
    expect(executeCommand("cat jira-github-autopilot.md", "/projects").lines?.join(" ")).toContain("Jira → GitHub Autopilot");
    expect(executeCommand("cd ..", "/projects").cwd).toBe("/");
    expect(executeCommand("pwd", "/projects").lines).toEqual(["/projects"]);
  });

  it("tab-completes commands and filesystem paths in context", () => {
    expect(completeCommand("cat ski", "/")).toBe("cat skills.txt");
    expect(completeCommand("cd pro", "/")).toBe("cd projects/");
    expect(completeCommand("cat jira", "/projects")).toBe("cat jira-github-autopilot.md");
  });
});
