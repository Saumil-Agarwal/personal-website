export type CommandResult = {
  kind: "text" | "navigate" | "clear" | "theme";
  lines?: string[];
  target?: string;
};

export type Command = {
  name: string;
  description: string;
  run: (args: string[]) => CommandResult;
};
