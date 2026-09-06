import { fireEvent, render, screen } from "@testing-library/react";
import { projects } from "@/content/site";
import { ProjectCard } from "./project-card";

it("opens substantial project details in a modal without navigating", () => {
  render(<ProjectCard project={projects[0]} />);

  expect(screen.queryByText(projects[0].highlights[0])).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: `Quick view: ${projects[0].title}` }));
  expect(screen.getByRole("dialog", { name: projects[0].title })).toBeVisible();
  expect(screen.getByText(projects[0].highlights[0])).toBeVisible();
  expect(screen.getByRole("heading", { name: "Problem" })).toBeVisible();
  expect(screen.getByRole("heading", { name: "Approach" })).toBeVisible();
  expect(screen.getByRole("heading", { name: "Impact" })).toBeVisible();
  fireEvent.click(screen.getByRole("button", { name: /close project details/i }));
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

it("keeps focus inside project details and restores it to the trigger", () => {
  render(<ProjectCard project={projects[0]} />);
  const trigger = screen.getByRole("button", { name: `Quick view: ${projects[0].title}` });
  trigger.focus();
  fireEvent.click(trigger);
  const close = screen.getByRole("button", { name: /close project details/i });
  expect(close).toHaveFocus();
  fireEvent.keyDown(document, { key: "Tab" });
  expect(screen.getByRole("dialog")).toContainElement(document.activeElement as HTMLElement);
  fireEvent.keyDown(document, { key: "Escape" });
  expect(trigger).toHaveFocus();
});
