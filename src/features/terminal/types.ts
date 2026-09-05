export type Directory = "/" | "/projects" | `/projects/${string}`;

export type CommandResult = {
  kind: "text" | "navigate" | "clear" | "theme" | "directory";
  lines?: string[];
  target?: string;
  cwd?: Directory;
};

export type Command = {
  name: string;
  description: string;
  run: (args: string[], cwd?: Directory, history?: string[]) => CommandResult;
};
