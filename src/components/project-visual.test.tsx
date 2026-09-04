import { render } from "@testing-library/react";
import { projects } from "@/content/site";
import { ProjectVisual, visualKinds } from "./project-visual";

const knownSlugs = projects.map((p) => p.slug);

describe("ProjectVisual", () => {
  it.each(knownSlugs)(
    "renders a decorative visual for slug '%s'",
    (slug) => {
      const { container } = render(
        <ProjectVisual slug={slug as (typeof projects)[number]["slug"]} />,
      );
      const visual = container.querySelector(
        `[data-project-visual="${slug}"]`,
      );
      expect(visual).toBeInTheDocument();
      expect(visual).toHaveAttribute("aria-hidden", "true");
    },
  );

  it("renders a neutral fallback for an unknown slug without throwing", () => {
    const { container } = render(
      <ProjectVisual slug={"nonexistent-project" as never} />,
    );
    const visual = container.querySelector("[data-project-visual]");
    expect(visual).toBeInTheDocument();
    expect(visual).toHaveAttribute("aria-hidden", "true");
  });

  it("contains an SVG inside each visual", () => {
    const { container } = render(
      <ProjectVisual slug={knownSlugs[0] as (typeof projects)[number]["slug"]} />,
    );
    const visual = container.querySelector("[data-project-visual]");
    expect(visual?.querySelector("svg")).toBeInTheDocument();
  });

  it("maps every content project slug to a non-neutral visual kind", () => {
    for (const slug of knownSlugs) {
      expect(visualKinds).toHaveProperty(slug);
      expect((visualKinds as Record<string, string>)[slug]).not.toBe("neutral");
    }
  });

  it("moves RDMA bits between GPUs and shows QoS congestion controls", () => {
    const { container } = render(<ProjectVisual slug="rdma-qos" />);
    expect(container.querySelectorAll("[data-rdma-bit]").length).toBeGreaterThan(0);
    expect(container.querySelector("[data-pfc-signal]")).toBeInTheDocument();
    expect(container.querySelector("[data-ecn-mark]")).toBeInTheDocument();
  });

  it("routes NATS messages from the source through JetStream to consumers", () => {
    const { container } = render(<ProjectVisual slug="nats-jetstream-telemetry" />);
    expect(container.querySelector("[data-stream-leg='source']")).toBeInTheDocument();
    expect(container.querySelector("[data-stream-leg='consumer-1']")).toBeInTheDocument();
    expect(container.querySelector("[data-stream-leg='consumer-2']")).toBeInTheDocument();
  });

  it("shows vertically isolated tenants sharing one horizontal database", () => {
    const { container } = render(<ProjectVisual slug="tenant-isolation" />);
    expect(container.querySelectorAll("[data-tenant]")).toHaveLength(3);
    expect(container.querySelector("[data-shared-database]")).toBeInTheDocument();
  });

  it("shows recognizable Twofold product silhouettes", () => {
    const { container } = render(<ProjectVisual slug="twofold-editions" />);
    expect(container.querySelector("[data-product='running-map']")).toBeInTheDocument();
    expect(container.querySelector("[data-product='tyre-holder']")).toBeInTheDocument();
    expect(container.querySelector("[data-product='book-nook']")).toBeInTheDocument();
  });
});
