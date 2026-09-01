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

  it("includes a mono caption", () => {
    render(<HeroArtwork />);
    expect(screen.getByTestId("hero-artwork")).toHaveTextContent(
      /generative system/i,
    );
  });

  it("wraps each tilted orbit ring in a stable <g> with a transform", () => {
    const { container } = render(<HeroArtwork />);
    const svg = container.querySelector("svg")!;
    const orbit2Wrapper = svg.querySelector("g.orbit-tilt-2");
    const orbit3Wrapper = svg.querySelector("g.orbit-tilt-3");
    expect(orbit2Wrapper).toBeInTheDocument();
    expect(orbit2Wrapper).toHaveAttribute("transform", expect.stringContaining("rotate"));
    expect(orbit3Wrapper).toBeInTheDocument();
    expect(orbit3Wrapper).toHaveAttribute("transform", expect.stringContaining("rotate"));
    const innerEllipse2 = orbit2Wrapper!.querySelector("ellipse");
    expect(innerEllipse2).toBeInTheDocument();
    expect(innerEllipse2).not.toHaveAttribute("transform");
    const innerEllipse3 = orbit3Wrapper!.querySelector("ellipse");
    expect(innerEllipse3).toBeInTheDocument();
    expect(innerEllipse3).not.toHaveAttribute("transform");
  });
});
