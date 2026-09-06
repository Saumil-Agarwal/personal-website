import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import { Hero } from "./hero";

describe("portfolio home", () => {
  it("renders a single clear heading and navigable portfolio landmarks", () => {
    render(<Home />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("navigation", { name: /primary/i })).toBeVisible();
    expect(screen.getByRole("main")).toBeVisible();
    expect(screen.getByRole("contentinfo")).toBeVisible();
  });

  it("wraps the nav inside a full-width site-header", () => {
    const { container } = render(<Home />);
    const header = container.querySelector(".site-header");
    expect(header).toBeInTheDocument();
    expect(header?.querySelector("nav[aria-label='Primary']")).toBeInTheDocument();
  });

  it("renders the redesigned hero artwork without the old caption", () => {
    render(<Home />);
    expect(screen.getByTestId("hero-artwork")).toBeVisible();
    expect(screen.queryByText(/generative system \/ 01/i)).not.toBeInTheDocument();
  });

  it("preserves all three hero CTAs alongside the artwork", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: /view projects/i })).toBeVisible();
    expect(screen.getByRole("link", { name: /explore the portfolio/i })).toBeVisible();
    expect(screen.getByRole("link", { name: /^resume$/i })).toBeVisible();
  });

  it("keeps the semantic H1 as Saumil Agarwal", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Saumil Agarwal" }),
    ).toBeVisible();
  });

  it("renders six project visuals with data attributes", () => {
    const { container } = render(<Home />);
    const visuals = container.querySelectorAll("[data-project-visual]");
    expect(visuals).toHaveLength(6);
  });

  it("places selected work directly after about", () => {
    render(<Home />);
    const about = document.getElementById("about")!;
    const projects = document.getElementById("projects")!;
    const experience = document.getElementById("experience")!;

    expect(about.compareDocumentPosition(projects) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(projects.compareDocumentPosition(experience) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("shows personal interests beyond technical work", () => {
    render(<Home />);
    expect(screen.getByText(/badminton, padel, or squash/i)).toBeVisible();
    expect(screen.getByText(/cooking new cuisines/i)).toBeVisible();
  });

  it("exposes every primary portfolio section and key links", () => {
    render(<Home />);

    for (const id of [
      "about",
      "experience",
      "projects",
      "skills",
      "terminal",
      "ask",
      "contact",
    ]) {
      expect(document.getElementById(id)).toBeTruthy();
    }

    expect(screen.getAllByRole("button", { name: /quick view/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /download resume/i })).toHaveAttribute(
      "href",
      "/saumil-agarwal-resume.pdf",
    );
    expect(screen.getByRole("link", { name: /email saumil/i })).toHaveAttribute(
      "href",
      expect.stringContaining("mailto:"),
    );
  });

  it("renders the complete role proposition without waiting for JavaScript", () => {
    render(<Hero />);
    expect(screen.getByTestId("hero-tagline")).toHaveTextContent(/Member of Technical Staff.+Agentic AI/);
  });

  it("links every project to its canonical case study", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: /read case study: jira/i })).toHaveAttribute(
      "href",
      "/projects/jira-github-autopilot",
    );
  });

  it("renders education and proof points", () => {
    render(<Home />);
    expect(screen.getByText(/BITS Pilani/)).toBeVisible();
    expect(screen.getByText(/12 teams coordinated/i)).toBeVisible();
  });

  it("renders artwork passed as children inside the hero section", () => {
    const { container } = render(
      <Hero>
        <div data-testid="slot-child">artwork slot</div>
      </Hero>,
    );
    const hero = container.querySelector("#top");
    expect(hero).toBeInTheDocument();
    expect(hero!.querySelector("[data-testid='slot-child']")).toBeInTheDocument();
  });
});
