import { experience, profile, projects, skillGroups } from "@/content/site";
import type { Command, CommandResult, Directory } from "./types";

const text = (lines: string[], target?: string): CommandResult => ({ kind: "text", lines, target });
const rootEntries = ["about.md", "experience.log", "interests.md", "projects/", "skills.txt", "contact.txt"];
const projectFiles = ["README.md", "architecture.txt", "impact.txt", "links.txt"];
const projectEntries = projects.map((project) => `${project.slug}/`);

function normalizePath(input: string, cwd: Directory): string {
  if (!input || input === "~") return "/";
  const parts = (input.startsWith("/") ? input : `${cwd}/${input}`).split("/");
  const resolved: string[] = [];
  for (const part of parts) {
    if (!part || part === ".") continue;
    if (part === "..") resolved.pop();
    else resolved.push(part);
  }
  return `/${resolved.join("/")}`;
}

function isDirectory(path: string): path is Directory {
  if (path === "/" || path === "/projects") return true;
  const match = path.match(/^\/projects\/([^/]+)$/);
  return Boolean(match && projects.some(({ slug }) => slug === match[1]));
}

function projectAt(path: string) {
  const slug = path.match(/^\/projects\/([^/]+)(?:\/|$)/)?.[1];
  return projects.find((project) => project.slug === slug);
}

function projectFile(path: string): string[] | undefined {
  const match = path.match(/^\/projects\/([^/]+)\/([^/]+)$/);
  if (!match) return undefined;
  const project = projects.find(({ slug }) => slug === match[1]);
  const filename = match[2];
  if (!project) return undefined;
  if (filename === "README.md") return [`# ${project.title}`, "", project.blurb, "", "PROBLEM", project.details.problem, "", "APPROACH", project.details.approach];
  if (filename === "architecture.txt") return ["ARCHITECTURE", ...project.details.architecture.map((item) => `- ${item}`)];
  if (filename === "impact.txt") return ["IMPACT", ...project.highlights.map((item) => `- ${item}`)];
  if (filename === "links.txt") return [project.links?.website ?? "No external link listed.", `/projects/${project.slug}`];
  return undefined;
}

function readFile(filename: string, cwd: Directory): CommandResult {
  const path = normalizePath(filename, cwd);
  const projectLines = projectFile(path);
  if (projectLines) return text(projectLines);
  const files: Record<string, string[]> = {
    "/about.md": [profile.summary],
    "/experience.log": experience.flatMap((role) => [`${role.period}  ${role.role} @ ${role.company}`, ...role.highlights.map((item) => `  - ${item}`)]),
    "/interests.md": [profile.interests],
    "/skills.txt": skillGroups.flatMap((group) => [`[${group.name}]`, ...group.skills]),
    "/contact.txt": [profile.email, profile.links.linkedin, profile.links.github, profile.availability],
  };
  return files[path] ? text(files[path]) : text([`cat: ${filename}: No such file`]);
}

function listDirectory(pathInput: string, cwd: Directory): CommandResult {
  const path = normalizePath(pathInput || ".", cwd);
  if (path === "/") return text(rootEntries);
  if (path === "/projects") return text(projectEntries);
  if (projectAt(path) && isDirectory(path)) return text(projectFiles);
  return text([`ls: ${pathInput || "."}: No such directory`]);
}

function changeDirectory(pathInput: string, cwd: Directory): CommandResult {
  const path = normalizePath(pathInput || "~", cwd);
  return isDirectory(path) ? { kind: "directory", cwd: path, lines: [] } : text([`cd: ${pathInput || "~"}: No such directory`]);
}

function tree(pathInput: string, cwd: Directory): CommandResult {
  const path = normalizePath(pathInput || ".", cwd);
  const projectTree = (indent = "") => projectEntries.flatMap((entry, projectIndex) => {
    const lastProject = projectIndex === projectEntries.length - 1;
    const branch = lastProject ? "└──" : "├──";
    const childIndent = `${indent}${lastProject ? "    " : "│   "}`;
    return [`${indent}${branch} ${entry}`, ...projectFiles.map((file, fileIndex) => `${childIndent}${fileIndex === projectFiles.length - 1 ? "└──" : "├──"} ${file}`)];
  });
  if (path === "/") {
    return text([".", "├── about.md", "├── experience.log", "├── interests.md", "├── skills.txt", "├── contact.txt", "└── projects/", ...projectTree("    ")]);
  }
  if (path === "/projects") {
    return text(["projects/", ...projectTree()]);
  }
  if (isDirectory(path) && projectAt(path)) return text([`${path.split("/").at(-1)}/`, ...projectFiles.map((file) => `├── ${file}`)]);
  return text([`tree: ${pathInput}: No such directory`]);
}

function openProject(pathInput: string, cwd: Directory): CommandResult {
  const path = normalizePath(pathInput || ".", cwd);
  const project = isDirectory(path) ? projectAt(path) : undefined;
  return project ? { kind: "navigate", target: `/projects/${project.slug}` } : text([`open: ${pathInput || "."}: Not a project`]);
}

export const commands: Command[] = [
  { name: "help", description: "List available commands", run: () => text(commands.map((command) => `${command.name.padEnd(12)} ${command.description}`)) },
  { name: "whoami", description: "Show profile", run: () => text([profile.name, profile.tagline, profile.location]) },
  { name: "about", description: "Read a short bio", run: () => text([profile.summary, profile.interests], "#about") },
  { name: "experience", description: "Open experience", run: () => ({ kind: "navigate", target: "#experience" }) },
  { name: "projects", description: "List selected work", run: () => text(projects.map((project) => project.title), "#projects") },
  { name: "skills", description: "Read skills.txt", run: () => text(skillGroups.flatMap((group) => [`[${group.name}]`, ...group.skills]), "#skills") },
  { name: "contact", description: "Show contact details", run: () => text([profile.email, profile.links.linkedin, profile.links.github], "#contact") },
  { name: "resume", description: "Download resume", run: () => ({ kind: "navigate", target: profile.resumeUrl }) },
  { name: "clear", description: "Clear terminal output", run: () => ({ kind: "clear" }) },
  { name: "theme", description: "Toggle color theme", run: () => ({ kind: "theme" }) },
  { name: "neofetch", description: "Show system information", run: () => text(["saumil@agarwal", "--------------", "role: Member of Technical Staff", "focus: systems · security · agentic AI", "off-screen: racquet sports · food · long walks", "location: Bengaluru, India"]) },
  { name: "pwd", description: "Print working directory", run: (_args, cwd = "/") => text([cwd]) },
  { name: "ls", description: "List files or directories", run: (args, cwd = "/") => listDirectory(args[0] ?? "", cwd) },
  { name: "cd", description: "Change directory", run: (args, cwd = "/") => changeDirectory(args[0] ?? "~", cwd) },
  { name: "cat", description: "Read a portfolio file", run: (args, cwd = "/") => readFile(args[0] ?? "", cwd) },
  { name: "tree", description: "Show the project file tree", run: (args, cwd = "/") => tree(args[0] ?? "", cwd) },
  { name: "open", description: "Open a project page", run: (args, cwd = "/") => openProject(args[0] ?? ".", cwd) },
  { name: "history", description: "Show command history", run: (_args, _cwd, history = []) => text(history.map((item, index) => `${index + 1}  ${item}`)) },
  { name: "sudo", description: "Request an elevated action", run: (args) => args[0] === "hire-me" ? text(["Permission granted. Let's talk."]) : text(["sudo: command requires a compelling reason."]) },
];

export function executeCommand(input: string, cwd: Directory = "/", history: string[] = []): CommandResult {
  const [name = "", ...args] = input.trim().split(/\s+/).filter(Boolean);
  if (!name) return text([]);
  const command = commands.find((candidate) => candidate.name === name.toLowerCase());
  return command ? command.run(args, cwd, history) : text([`command not found: ${name.toLowerCase()}. Try 'help'.`]);
}

function entriesFor(cwd: Directory, command: string): string[] {
  if (command === "cd") {
    if (cwd === "/") return ["projects/"];
    if (cwd === "/projects") return ["../", ...projectEntries];
    return ["../", "/", "~"];
  }
  if (command === "cat") {
    if (cwd === "/") return rootEntries.filter((entry) => !entry.endsWith("/"));
    if (cwd === "/projects") return [];
    return projectFiles;
  }
  if (command === "ls" || command === "tree" || command === "open") return cwd === "/" ? ["projects/"] : cwd === "/projects" ? projectEntries : [".", "../"];
  return [];
}

export function completeCommand(input: string, cwd: Directory = "/"): string | null {
  const normalized = input.trimStart();
  const spaceIndex = normalized.indexOf(" ");
  if (spaceIndex < 0) {
    const matches = commands.filter((command) => command.name.startsWith(normalized.toLowerCase()));
    return matches.length === 1 ? matches[0].name : null;
  }
  const command = normalized.slice(0, spaceIndex).toLowerCase();
  const prefix = normalized.slice(spaceIndex + 1);
  const matches = entriesFor(cwd, command).filter((entry) => entry.toLowerCase().startsWith(prefix.toLowerCase()));
  return matches.length === 1 ? `${command} ${matches[0]}` : null;
}
