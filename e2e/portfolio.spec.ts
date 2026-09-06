import { expect, test } from "@playwright/test";

test("portfolio core journey, project modal, and SEO resources", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: "Saumil Agarwal" })).toBeVisible();
  await page.getByRole("button", { name: /quick view: jira/i }).click();
  await expect(page.getByRole("dialog", { name: /jira → github autopilot/i })).toBeVisible();
  await expect(page.getByText(/automated the path from Jira issue/i)).toBeVisible();
  await expect(page).toHaveURL(/\/$/);
  await page.getByRole("button", { name: /close project details/i }).click();
  await page.getByRole("link", { name: /read case study: jira/i }).click();
  await expect(page).toHaveURL(/projects\/jira-github-autopilot/);
  await expect(page.getByRole("heading", { name: "Problem" })).toBeVisible();
  await expect(page.goto("/sitemap.xml")).resolves.toBeTruthy();
  await expect(page.locator("body")).toContainText("projects/jira-github-autopilot");
  await expect(page.goto("/robots.txt")).resolves.toBeTruthy();
  await expect(page.locator("body")).toContainText("Sitemap");
});

test("visual layout: separated hero, project visuals, and no overflow", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".site-header")).toBeVisible();
  await expect(page.getByTestId("hero-artwork")).toBeVisible();
  if (page.viewportSize()!.width > 760) {
    const [copyBox, artworkBox] = await Promise.all([
      page.locator(".hero-copy").boundingBox(),
      page.getByTestId("hero-artwork").boundingBox(),
    ]);
    expect(copyBox).not.toBeNull();
    expect(artworkBox).not.toBeNull();
    expect(copyBox!.x + copyBox!.width).toBeLessThanOrEqual(artworkBox!.x);
    expect(artworkBox!.width).toBeLessThanOrEqual(620);
  }
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
  await expect(page.getByTestId("hero-artwork")).toBeVisible();
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
