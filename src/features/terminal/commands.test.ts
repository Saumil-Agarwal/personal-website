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

  it("models every project as a navigable directory with useful files", () => {
    expect(executeCommand("ls", "/projects").lines).toContain("jira-github-autopilot/");
    expect(executeCommand("cd jira-github-autopilot", "/projects").cwd).toBe("/projects/jira-github-autopilot");
    expect(executeCommand("ls", "/projects/jira-github-autopilot").lines).toEqual(["README.md", "architecture.txt", "impact.txt", "links.txt"]);
    expect(executeCommand("cat README.md", "/projects/jira-github-autopilot").lines?.join(" ")).toContain("Jira → GitHub Autopilot");
    expect(executeCommand("cd ../rdma-qos", "/projects/jira-github-autopilot").cwd).toBe("/projects/rdma-qos");
    expect(executeCommand("cd /", "/projects/rdma-qos").cwd).toBe("/");
  });

  it("resolves absolute and relative paths", () => {
    expect(executeCommand("cat /projects/rdma-qos/architecture.txt").lines?.join(" ")).toContain("NVIDIA Mellanox NICs");
    expect(executeCommand("ls projects/tenant-isolation").lines).toContain("README.md");
    expect(executeCommand("cd ~", "/projects/rdma-qos").cwd).toBe("/");
    expect(executeCommand("cat /projects/rdma-qos/missing/README.md").lines?.[0]).toContain("No such file");
  });

  it("offers tree, open, and history commands", () => {
    expect(executeCommand("tree projects").lines?.join("\n")).toContain("jira-github-autopilot/");
    expect(executeCommand("tree /").lines).toContain("├── skills.txt");
    expect(executeCommand("tree /").lines).toContain("├── contact.txt");
    expect(executeCommand("open .", "/projects/twofold-editions")).toMatchObject({ kind: "navigate", target: "/projects/twofold-editions" });
    expect(executeCommand("history", "/", ["whoami", "ls"])).toMatchObject({ lines: ["1  whoami", "2  ls"] });
  });

  it("tab-completes commands and filesystem paths in context", () => {
    expect(completeCommand("cat ski", "/")).toBe("cat skills.txt");
    expect(completeCommand("cd pro", "/")).toBe("cd projects/");
    expect(completeCommand("cd jira", "/projects")).toBe("cd jira-github-autopilot/");
    expect(completeCommand("cat arch", "/projects/jira-github-autopilot")).toBe("cat architecture.txt");
  });
});
