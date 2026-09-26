import { describe, expect, it } from "vitest";
import { sceneAtScroll } from "./scroll-scene";

describe("scroll choreography", () => {
  it("moves from the first scroll rather than waiting for a chapter change", () => {
    expect(sceneAtScroll(100, [0, 1000, 2000])).toBeCloseTo(.1);
    expect(sceneAtScroll(500, [0, 1000, 2000])).toBeCloseTo(.5);
  });
  it("uses measured section positions so different heights and direct jumps work", () => {
    expect(sceneAtScroll(1800, [0, 1200, 1800, 3000])).toBe(2);
    expect(sceneAtScroll(2400, [0, 1200, 1800, 3000])).toBe(2.5);
  });
  it("reverses exactly and clamps overscroll", () => {
    const positions = [0, 900, 2100];
    expect(sceneAtScroll(1500, positions)).toBe(1.5);
    expect(sceneAtScroll(450, positions)).toBe(.5);
    expect(sceneAtScroll(-80, positions)).toBe(0);
    expect(sceneAtScroll(9999, positions)).toBe(2);
  });
  it("handles missing or coincident anchors without invalid geometry", () => {
    expect(sceneAtScroll(500, [])).toBe(0);
    expect(sceneAtScroll(500, [0])).toBe(0);
    expect(sceneAtScroll(250, [0, 0, 500])).toBe(1.5);
  });
});
