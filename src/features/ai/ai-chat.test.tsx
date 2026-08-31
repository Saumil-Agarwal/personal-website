import { act, fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { AiChat } from "./ai-chat";
import { scriptedProvider } from "./scripted-provider";

it("streams a suggested answer and disables controls while thinking", async () => {
  vi.useFakeTimers();
  render(<AiChat />);

  fireEvent.click(screen.getByRole("button", { name: /agentic ai project/i }));

  expect(screen.getByText(/thinking/i)).toBeVisible();
  expect(screen.getByRole("button", { name: /ask/i })).toBeDisabled();

  await act(async () => {});
  await act(async () => vi.advanceTimersByTimeAsync(5_000));
  expect(screen.getByText(/Jira → GitHub Autopilot/)).toBeVisible();
  expect(screen.getByRole("button", { name: /ask/i })).toBeEnabled();
  vi.useRealTimers();
});

it("presents provider errors accessibly", async () => {
  vi.spyOn(scriptedProvider, "answer").mockRejectedValueOnce(new Error("offline"));
  render(<AiChat />);
  const input = screen.getByRole("textbox", { name: /your question/i });
  fireEvent.change(input, { target: { value: "projects" } });
  fireEvent.submit(input.closest("form")!);

  expect(await screen.findByRole("alert")).toHaveTextContent(/couldn't answer/i);
});

it("submits typed questions, ignores empty values, and handles repeats", async () => {
  vi.useFakeTimers();
  render(<AiChat />);
  const input = screen.getByRole("textbox", { name: /your question/i });
  const form = input.closest("form")!;

  fireEvent.submit(form);
  expect(screen.queryByText(/thinking/i)).not.toBeInTheDocument();

  fireEvent.change(input, { target: { value: "systems background" } });
  fireEvent.submit(form);
  await act(async () => {});
  await act(async () => vi.advanceTimersByTimeAsync(5_000));
  expect(screen.getByText(/distributed telemetry/i)).toBeVisible();

  fireEvent.submit(form);
  await act(async () => {});
  await act(async () => vi.advanceTimersByTimeAsync(5_000));
  expect(screen.getByText(/distributed telemetry/i)).toBeVisible();
  vi.useRealTimers();
});
