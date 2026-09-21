import { expect, test } from "@playwright/test";

test("the first scroll advances the story and navigation follows project chapters", async ({ page, viewport }) => {
  test.skip(!viewport || viewport.width <= 760, "desktop chapter snapping");
  await page.goto("/");
  const navigator = page.getByRole("navigation", { name: "Portfolio chapters" });
  await expect(navigator.getByRole("link", { name: "Introduction", exact: true })).toHaveAttribute("aria-current", "step");
  await page.mouse.wheel(0, 650);
  await expect(navigator.getByRole("link", { name: "Philosophy", exact: true })).toHaveAttribute("aria-current", "step");
  await navigator.getByRole("link", { name: "Agentic AI", exact: true }).click();
  await expect(page.locator("#work-jira-github-autopilot")).toBeInViewport({ ratio: .65 });
  await expect(navigator.getByRole("link", { name: "Agentic AI", exact: true })).toHaveAttribute("aria-current", "step");
  await page.getByRole("link", { name: /next chapter: networking/i }).click();
  await expect(navigator.getByRole("link", { name: "Networking", exact: true })).toHaveAttribute("aria-current", "step");
  await page.mouse.move(60, 200);
  await page.mouse.wheel(0, 650);
  await expect(navigator.getByRole("link", { name: "Security", exact: true })).toHaveAttribute("aria-current", "step");
  await page.getByRole("button", { name: "Pause animations" }).click();
  expect(await page.locator("html").evaluate(element => getComputedStyle(element).scrollSnapType)).toBe("none");
});

test("reduced motion preserves all content without snapping or animated geometry", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(await page.locator("html").evaluate(element => getComputedStyle(element).scrollSnapType)).toBe("none");
  expect(await page.locator(".neural-orbit").evaluate(element => getComputedStyle(element).animationName)).toBe("none");
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
