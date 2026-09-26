import { expect, test } from "@playwright/test";

test("scroll continuously transforms the scene, reverses, and preserves direct navigation", async ({ page }) => {
  await page.goto("/");
  const canvas = page.locator(".machine-canvas");
  await expect(canvas).toHaveAttribute("data-scene", "0.000");
  const firstFrame = await canvas.evaluate((element: HTMLCanvasElement) => element.toDataURL());
  await page.mouse.wheel(0, 220);
  await expect.poll(async () => Number(await canvas.getAttribute("data-scene"))).toBeGreaterThan(.05);
  expect(Number(await canvas.getAttribute("data-scene"))).toBeLessThan(1);
  expect(await canvas.evaluate((element: HTMLCanvasElement) => element.toDataURL())).not.toBe(firstFrame);
  await page.mouse.wheel(0, -1000);
  await expect(canvas).toHaveAttribute("data-scene", "0.000");
  expect(await canvas.evaluate((element: HTMLCanvasElement) => element.toDataURL())).toBe(firstFrame);
  await page.getByRole("link", { name: "View projects" }).click();
  await expect(page.locator("#work-jira-github-autopilot .project-copy")).toBeInViewport();
  await expect.poll(async () => Number(await canvas.getAttribute("data-scene"))).toBeCloseTo(3, 1);
  await page.getByRole("link", { name: /next chapter: networking/i }).click();
  await expect(page.locator("#work-rdma-qos .project-copy")).toBeInViewport();
  await page.getByRole("button", { name: "Pause animations" }).click();
  const frozen = await canvas.getAttribute("data-scene");
  await page.mouse.wheel(0, 400);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(400);
  await expect(canvas).toHaveAttribute("data-scene", frozen!);
  await page.getByRole("button", { name: "Resume animations" }).click();
  await expect.poll(() => canvas.getAttribute("data-scene")).not.toBe(frozen);
  expect(await page.locator("html").evaluate(element => getComputedStyle(element).scrollSnapType)).toBe("none");
});

test("reduced motion preserves all content without snapping or animated geometry", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(await page.locator("html").evaluate(element => getComputedStyle(element).scrollSnapType)).toBe("none");
  expect(await page.locator("#top .machine-panel").evaluate(element => getComputedStyle(element).position)).toBe("relative");
  await expect(page.locator("[data-project-visual]")).toHaveCount(6);
  await page.getByRole("link", { name: "View projects" }).click();
  await expect(page.locator("#work-jira-github-autopilot .project-chapter-meta")).toBeInViewport();
  await page.getByRole("button", { name: /quick view: jira/i }).click();
  await expect(page.getByRole("dialog", { name: /jira/i })).toBeVisible();
});

test("project details remain reachable without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(baseURL!);
  await expect(page.getByRole("heading", { level: 1, name: "Saumil Agarwal" })).toBeVisible();
  await page.getByRole("link", { name: "Open project details ↗" }).first().click();
  await expect(page).toHaveURL(/projects\/jira-github-autopilot/);
  await context.close();
});

test("tablet navigation and mobile case-study header stay usable", async ({ page }) => {
  await page.setViewportSize({ width: 700, height: 900 });
  await page.goto("/");
  await expect(page.locator(".mobile-nav summary")).toBeVisible();
  await page.locator(".mobile-nav summary").click();
  await expect(page.locator('.mobile-nav a[href="#projects"]')).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/projects/jira-github-autopilot");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await expect(page.getByRole("link", { name: "All projects" })).toBeVisible();
});

test("panels taller than the available reading area use normal scrolling", async ({ page }) => {
  for (const viewport of [{ width: 390, height: 844 }, { width: 1024, height: 768 }]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-machine", "true");
    await page.addStyleTag({ content: "html { font-size: 20px; }" });
    await expect.poll(() => page.locator(".machine-panel").evaluateAll(panels => {
      const top = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop);
      const bottom = document.querySelector(".chapter-bar")!.getBoundingClientRect().height;
      return panels.filter(panel => getComputedStyle(panel).position === "sticky" && panel.getBoundingClientRect().height > innerHeight - top - bottom + 2).length;
    })).toBe(0);
    await page.getByRole("link", { name: "View projects" }).click();
    await page.getByRole("button", { name: /quick view: jira/i }).click();
    await expect(page.getByRole("dialog", { name: /jira/i })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});
