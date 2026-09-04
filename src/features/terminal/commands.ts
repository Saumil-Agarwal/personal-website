import { experience, profile, projects, skillGroups } from "@/content/site";
import type { Command, CommandResult } from "./types";

type Directory = "/" | "/projects";

const text = (lines: string[], target?: string): CommandResult => ({ kind: "text", lines, target });
const rootEntries = ["about.md", "experience.log", "projects/", "skills.txt", "contact.txt"];
const projectEntries = projects.map((project) => `${project.slug}.md`);

function projectFile(slugFile: string): string[] | undefined {
  const project = projects.find(({ slug }) => `${slug}.md` === slugFile);
  if (!project) return undefined;
  return [
    `# ${project.title}`,
    project.blurb,
    "",
    "PROBLEM",
    project.details.problem,
    "",
    "APPROACH",
    project.details.approach,
    "",
    "ARCHITECTURE",
    ...project.details.architecture.map((item) => `- ${item}`),
    "",
    "IMPACT",
    ...project.highlights.map((item) => `- ${item}`),
  ];
}

function readFile(filename: string, cwd: Directory): CommandResult {
  if (cwd === "/projects") {
    const lines = projectFile(filename);
    return lines ? text(lines) : text([`cat: ${filename}: No such file`]);
  }
  const files: Record<string, string[]> = {
    "about.md": [profile.summary, `Currently: ${profile.currently}`],
    "experience.log": experience.flatMap((role) => [`${role.period}  ${role.role} @ ${role.company}`, ...role.highlights.map((item) => `  - ${item}`)]),
    "skills.txt": skillGroups.flatMap((group) => [`[${group.name}]`, ...group.skills]),
    "contact.txt": [profile.email, profile.links.linkedin, profile.links.github, profile.availability],
  };
  return files[filename] ? text(files[filename]) : text([`cat: ${filename}: No such file`]);
}

function changeDirectory(path: string, cwd: Directory): CommandResult {
  if (path === "/" || (path === ".." && cwd === "/projects")) return { kind: "directory", cwd: "/", lines: [] };
  if ((path === "projects" || path === "projects/" || path === "/projects") && cwd === "/") return { kind: "directory", cwd: "/projects", lines: [] };
  if (path === "." || (path === ".." && cwd === "/")) return { kind: "directory", cwd, lines: [] };
  return text([`cd: ${path || "~"}: No such directory`]);
}

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
  { name: "pwd", description: "Print working directory", run: (_args, cwd = "/") => text([cwd]) },
  { name: "ls", description: "List portfolio files", run: (_args, cwd = "/") => text(cwd === "/" ? rootEntries : projectEntries) },
  { name: "cd", description: "Change portfolio directory", run: (args, cwd = "/") => changeDirectory(args[0] ?? "/", cwd) },
  { name: "cat", description: "Read a portfolio file", run: (args, cwd = "/") => readFile(args[0] ?? "", cwd) },
  { name: "sudo", description: "Request an elevated action", run: (args) => args[0] === "hire-me" ? text(["Permission granted. Let's talk."]) : text(["sudo: command requires a compelling reason."]) },
];

export function executeCommand(input: string, cwd: Directory = "/"): CommandResult {
  const [name = "", ...args] = input.trim().split(/\s+/).filter(Boolean);
  if (!name) return text([]);
  const command = commands.find((candidate) => candidate.name === name.toLowerCase());
  return command ? command.run(args, cwd) : text([`command not found: ${name.toLowerCase()}. Try 'help'.`]);
}

export function completeCommand(input: string, cwd: Directory = "/"): string | null {
  const normalized = input.trimStart();
  const spaceIndex = normalized.indexOf(" ");
  if (spaceIndex < 0) {
    const matches = commands.filter((command) => command.name.startsWith(normalized.toLowerCase()));
    return matches.length === 1 ? matches[0].name : null;
  }

  const command = normalized.slice(0, spaceIndex).toLowerCase();
  const prefix = normalized.slice(spaceIndex + 1).toLowerCase();
  const candidates = command === "cd"
    ? (cwd === "/" ? ["projects/"] : [".."])
    : command === "cat"
      ? (cwd === "/" ? rootEntries.filter((entry) => !entry.endsWith("/")) : projectEntries)
      : [];
  const matches = candidates.filter((entry) => entry.startsWith(prefix));
  return matches.length === 1 ? `${command} ${matches[0]}` : null;
}
