import { fireEvent, render, screen } from "@testing-library/react";
import { projects } from "@/content/site";
import { ProjectCard } from "./project-card";

it("opens substantial project details in a modal without navigating", () => {
  render(<ProjectCard project={projects[0]} />);

  expect(screen.queryByText(projects[0].highlights[0])).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: `View project: ${projects[0].title}` }));
  expect(screen.getByRole("dialog", { name: projects[0].title })).toBeVisible();
  expect(screen.getByText(projects[0].highlights[0])).toBeVisible();
  expect(screen.getByRole("heading", { name: "Problem" })).toBeVisible();
  expect(screen.getByRole("heading", { name: "Approach" })).toBeVisible();
  expect(screen.getByRole("heading", { name: "Impact" })).toBeVisible();
  fireEvent.click(screen.getByRole("button", { name: /close project details/i }));
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});
