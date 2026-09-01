import { expect, test } from "@playwright/test";

test("portfolio core journey, routes, and SEO resources", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: "Saumil Agarwal" })).toBeVisible();
  await page.getByRole("link", { name: /view project: jira/i }).click();
  await expect(page.getByRole("heading", { name: /jira → github autopilot/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /back to portfolio/i })).toBeVisible();
  await expect(page.goto("/sitemap.xml")).resolves.toBeTruthy();
  await expect(page.locator("body")).toContainText("projects/jira-github-autopilot");
  await expect(page.goto("/robots.txt")).resolves.toBeTruthy();
  await expect(page.locator("body")).toContainText("Sitemap");
});

test("visual upgrade: header, hero artwork, project visuals, and no overflow", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".site-header")).toBeVisible();
  await expect(page.getByTestId("hero-artwork")).toBeVisible();
  await expect(page.locator("[data-project-visual]")).toHaveCount(6);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
    ),
  ).toBe(true);
});

test("mobile viewport: header, artwork, visuals, and no overflow @mobile", async ({
  page,
  viewport,
}) => {
  test.skip(!viewport || viewport.width > 500, "mobile-only test");
  await page.goto("/");
  await expect(page.locator(".site-header")).toBeVisible();
  await expect(page.getByTestId("hero-artwork")).toBeVisible();
  await expect(page.locator("[data-project-visual]")).toHaveCount(6);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
    ),
  ).toBe(true);
});
