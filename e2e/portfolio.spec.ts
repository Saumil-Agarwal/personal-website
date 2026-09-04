import { expect, test } from "@playwright/test";

test("portfolio core journey, inline projects, and SEO resources", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: "Saumil Agarwal" })).toBeVisible();
  await page.getByRole("button", { name: /view project: jira/i }).click();
  await expect(page.getByText(/automated bug reproduction/i)).toBeVisible();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.goto("/sitemap.xml")).resolves.toBeTruthy();
  await expect(page.locator("body")).toContainText("projects/jira-github-autopilot");
  await expect(page.goto("/robots.txt")).resolves.toBeTruthy();
  await expect(page.locator("body")).toContainText("Sitemap");
});

test("visual layout: compact hero, project visuals, and no overflow", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".site-header")).toBeVisible();
  await expect(page.getByTestId("hero-artwork")).toHaveCount(0);
  await expect(page.locator("[data-project-visual]")).toHaveCount(6);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
    ),
  ).toBe(true);
});

test("mobile viewport: header, palette scrolling, visuals, and no overflow @mobile", async ({
  page,
  viewport,
}) => {
  test.skip(!viewport || viewport.width > 500, "mobile-only test");
  await page.goto("/");
  await expect(page.locator(".site-header")).toBeVisible();
  await expect(page.getByTestId("hero-artwork")).toHaveCount(0);
  await expect(page.locator("[data-project-visual]")).toHaveCount(6);
  await page.getByRole("button", { name: /open command palette/i }).click();
  await expect(page.locator(".palette-results")).toBeVisible();
  expect(await page.locator(".palette-results").evaluate((element) => {
    const styles = getComputedStyle(element);
    return styles.overflowY === "auto" && element.clientHeight <= element.scrollHeight;
  })).toBe(true);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
    ),
  ).toBe(true);
});
