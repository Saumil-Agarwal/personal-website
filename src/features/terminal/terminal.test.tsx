import { fireEvent, render, screen } from "@testing-library/react";
import { Terminal } from "./terminal";

it("prints the help command and available commands by default", () => {
  render(<Terminal />);

  expect(screen.getByText("help", { selector: ".terminal-output .terminal-command" })).toBeVisible();
  expect(screen.getByText(/List available commands/)).toBeVisible();
});

it("submits commands and clears output", () => {
  render(<Terminal />);
  const input = screen.getByRole("textbox", { name: /terminal command/i });
  fireEvent.change(input, { target: { value: "whoami" } });
  fireEvent.submit(input.closest("form")!);
  expect(screen.getByText("Saumil Agarwal")).toBeVisible();
  fireEvent.change(input, { target: { value: "clear" } });
  fireEvent.submit(input.closest("form")!);
  expect(screen.queryByText("Saumil Agarwal")).not.toBeInTheDocument();
});

it("supports history and tab completion", () => {
  render(<Terminal />);
  const input = screen.getByRole("textbox", { name: /terminal command/i });
  fireEvent.change(input, { target: { value: "whoami" } });
  fireEvent.submit(input.closest("form")!);
  fireEvent.keyDown(input, { key: "ArrowUp" });
  expect(input).toHaveValue("whoami");
  fireEvent.change(input, { target: { value: "who" } });
  fireEvent.keyDown(input, { key: "Tab" });
  expect(input).toHaveValue("whoami");
});

it("changes directories and completes project filenames", () => {
  render(<Terminal />);
  const input = screen.getByRole("textbox", { name: /terminal command/i });

  fireEvent.change(input, { target: { value: "cd projects" } });
  fireEvent.submit(input.closest("form")!);
  expect(screen.getByText("saumil@agarwal:~/projects$", { selector: "form .accent" })).toBeVisible();

  fireEvent.change(input, { target: { value: "cat jira" } });
  fireEvent.keyDown(input, { key: "Tab" });
  expect(input).toHaveValue("cat jira-github-autopilot.md");
});
