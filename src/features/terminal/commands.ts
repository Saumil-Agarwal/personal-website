import { profile, projects, skillGroups } from "@/content/site";
import type { Command, CommandResult } from "./types";

const text = (lines: string[], target?: string): CommandResult => ({ kind: "text", lines, target });

export const commands: Command[] = [
  { name: "help", description: "List available commands", run: () => text(commands.map((command) => `${command.name.padEnd(12)} ${command.description}`)) },
  { name: "whoami", description: "Show profile", run: () => text([profile.name, profile.tagline, profile.location]) },
  { name: "about", description: "Read a short bio", run: () => text([profile.summary], "#about") },
  { name: "experience", description: "Open experience", run: () => ({ kind: "navigate", target: "#experience" }) },
  { name: "projects", description: "List selected work", run: () => text(projects.map((project) => project.title), "#projects") },
  { name: "skills", description: "Read skills.txt", run: () => text(skillGroups.flatMap((group) => [`[${group.name}]`, ...group.skills]), "#skills") },
  { name: "contact", description: "Show contact details", run: () => text([profile.email, profile.links.linkedin, profile.links.github], "#contact") },
  { name: "resume", description: "Download resume", run: () => ({ kind: "navigate", target: profile.resumeUrl }) },
  { name: "clear", description: "Clear terminal output", run: () => ({ kind: "clear" }) },
  { name: "theme", description: "Toggle color theme", run: () => ({ kind: "theme" }) },
  { name: "neofetch", description: "Show system information", run: () => text(["saumil@agarwal", "--------------", "role: Member of Technical Staff", "focus: systems · security · agentic AI", "location: Bengaluru, India"]) },
  { name: "ls", description: "List portfolio files", run: () => text(["about.md  experience.log  projects/  skills.txt  contact.txt"]) },
  { name: "cat", description: "Read a portfolio file", run: (args) => args[0] === "skills.txt" ? text(skillGroups.flatMap((group) => group.skills)) : text(["cat: supported file: skills.txt"]) },
  { name: "sudo", description: "Request an elevated action", run: (args) => args[0] === "hire-me" ? text(["Permission granted. Let's talk."]) : text(["sudo: command requires a compelling reason."]) },
];

export function executeCommand(input: string): CommandResult {
  const [name = "", ...args] = input.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!name) return text([]);
  const command = commands.find((candidate) => candidate.name === name);
  return command ? command.run(args) : text([`command not found: ${name}. Try 'help'.`]);
}

export function completeCommand(input: string): string | null {
  const trimmed = input.trim().toLowerCase();
  const matches = commands.filter((command) => command.name.startsWith(trimmed));
  return matches.length === 1 ? matches[0].name : null;
}
