import { render, screen } from "@testing-library/react";
import { HeroArtwork } from "./hero-artwork";

describe("HeroArtwork", () => {
  it("renders a decorative artwork container with the correct test id", () => {
    render(<HeroArtwork />);
    const artwork = screen.getByTestId("hero-artwork");
    expect(artwork).toBeVisible();
  });

  it("is hidden from assistive technology", () => {
    render(<HeroArtwork />);
    const artwork = screen.getByTestId("hero-artwork");
    expect(artwork).toHaveAttribute("aria-hidden", "true");
  });

  it("contains an SVG element", () => {
    const { container } = render(<HeroArtwork />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("does not include the old generative-system caption", () => {
    render(<HeroArtwork />);
    expect(screen.getByTestId("hero-artwork")).not.toHaveTextContent(/generative system/i);
  });

  it("depicts a distributed system with routed data and security boundaries", () => {
    const { container } = render(<HeroArtwork />);
    expect(container.querySelectorAll("[data-system-node]").length).toBeGreaterThanOrEqual(4);
    expect(container.querySelectorAll("[data-data-packet]").length).toBeGreaterThanOrEqual(3);
    expect(container.querySelector("[data-security-boundary]")).toBeInTheDocument();
  });
});
