import { fireEvent, render, screen } from "@testing-library/react";
import { Terminal } from "./terminal";

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
