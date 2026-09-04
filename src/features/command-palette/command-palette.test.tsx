import { fireEvent, render, screen } from "@testing-library/react";
import { Nav } from "@/components/nav";
import { CommandPalette } from "./command-palette";

it("opens from a visible control, filters, selects, and closes", () => {
  render(<><Nav /><CommandPalette /></>);
  fireEvent.click(screen.getByRole("button", { name: /open command palette/i }));
  const search = screen.getByRole("textbox", { name: /search commands/i });
  expect(search).toBeVisible();
  expect(screen.getByRole("list", { name: /available commands/i })).toHaveClass("palette-results");

  fireEvent.change(search, { target: { value: "who" } });
  expect(screen.getByText("whoami")).toBeVisible();

  fireEvent.keyDown(search, { key: "ArrowDown" });
  expect(screen.getByRole("button", { name: /whoami/i })).toHaveClass("selected");
  fireEvent.keyDown(search, { key: "Enter" });
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

  fireEvent.keyDown(window, { key: "k", metaKey: true });
  expect(screen.getByRole("textbox", { name: /search commands/i })).toHaveFocus();
  fireEvent.keyDown(screen.getByRole("textbox", { name: /search commands/i }), { key: "Escape" });
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});
