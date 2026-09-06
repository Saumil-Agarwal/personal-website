import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react";
import { vi } from "vitest";
import { Nav } from "@/components/nav";
import { Terminal } from "@/features/terminal/terminal";
import { CommandPalette } from "./command-palette";

it("opens from a visible control, filters, selects, and closes", () => {
  render(<><Nav /><CommandPalette /></>);
  fireEvent.click(screen.getByRole("button", { name: /open command palette/i }));
  const search = screen.getByRole("combobox", { name: /search commands/i });
  expect(search).toBeVisible();
  expect(screen.getByRole("listbox", { name: /available commands/i })).toHaveClass("palette-results");

  fireEvent.change(search, { target: { value: "who" } });
  expect(screen.getByText("whoami")).toBeVisible();

  fireEvent.keyDown(search, { key: "ArrowDown" });
  expect(screen.getByRole("option", { name: /whoami/i })).toHaveAttribute("aria-selected", "true");
  fireEvent.keyDown(search, { key: "Enter" });
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

  fireEvent.keyDown(window, { key: "k", metaKey: true });
  expect(screen.getByRole("combobox", { name: /search commands/i })).toHaveFocus();
  fireEvent.keyDown(screen.getByRole("combobox", { name: /search commands/i }), { key: "Escape" });
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

it("searches descriptions case-insensitively and exposes combobox state", () => {
  render(<><Nav /><CommandPalette /></>);
  fireEvent.click(screen.getByRole("button", { name: /open command palette/i }));
  const search = screen.getByRole("combobox", { name: /search commands/i });
  fireEvent.change(search, { target: { value: "SHOW PROFILE" } });
  expect(screen.getByRole("option", { name: /whoami/i })).toBeVisible();
  expect(search).toHaveAttribute("aria-expanded", "true");
});

it("closes globally and returns focus to the opener", () => {
  render(<><Nav /><CommandPalette /></>);
  const opener = screen.getByRole("button", { name: /open command palette/i });
  opener.focus();
  fireEvent.click(opener);
  fireEvent.keyDown(document, { key: "Escape" });
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(opener).toHaveFocus();
});

it("runs selected commands visibly through the terminal", () => {
  vi.useFakeTimers();
  const scrollIntoView = vi.fn();
  render(<><Nav /><div id="terminal" ref={(node) => { if (node) node.scrollIntoView = scrollIntoView; }}><Terminal /></div><CommandPalette /></>);

  fireEvent.click(screen.getByRole("button", { name: /open command palette/i }));
  fireEvent.change(screen.getByRole("combobox", { name: /search commands/i }), { target: { value: "whoami" } });
  fireEvent.click(screen.getByRole("option", { name: /whoami/i }));

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "center" });
  act(() => vi.advanceTimersByTime(70));
  expect(screen.getByRole("textbox", { name: /terminal command/i })).toHaveValue("wh");
  act(() => vi.runAllTimers());
  expect(screen.getByText("Saumil Agarwal")).toBeVisible();
  vi.useRealTimers();
});

it("does not cancel a palette command when the terminal form submits during typing", () => {
  vi.useFakeTimers();
  render(<><Nav /><div id="terminal" ref={(node) => { if (node) node.scrollIntoView = vi.fn(); }}><Terminal /></div><CommandPalette /></>);

  fireEvent.click(screen.getByRole("button", { name: /open command palette/i }));
  fireEvent.change(screen.getByRole("combobox", { name: /search commands/i }), { target: { value: "whoami" } });
  fireEvent.click(screen.getByRole("option", { name: /whoami/i }));
  act(() => vi.advanceTimersByTime(35));
  fireEvent.submit(screen.getByRole("textbox", { name: /terminal command/i }).closest("form")!);
  act(() => vi.runAllTimers());

  expect(screen.getByText("Saumil Agarwal")).toBeVisible();
  vi.useRealTimers();
});
