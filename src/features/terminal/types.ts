export type CommandResult = {
  kind: "text" | "navigate" | "clear" | "theme" | "directory";
  lines?: string[];
  target?: string;
  cwd?: "/" | "/projects";
};

export type Command = {
  name: string;
  description: string;
  run: (args: string[], cwd?: "/" | "/projects") => CommandResult;
};
