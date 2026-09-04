import { fireEvent, render, screen } from "@testing-library/react";
import { projects } from "@/content/site";
import { ProjectCard } from "./project-card";

it("reveals project details inside the card without navigating", () => {
  render(<ProjectCard project={projects[0]} />);

  expect(screen.queryByText(projects[0].highlights[0])).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: `View project: ${projects[0].title}` }));
  expect(screen.getByText(projects[0].highlights[0])).toBeVisible();
  expect(screen.getByRole("button", { name: `Hide project: ${projects[0].title}` })).toHaveAttribute("aria-expanded", "true");
});
