import { expect, test } from "@playwright/test";

test("portfolio core journey, project modal, and SEO resources", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: "Saumil Agarwal" })).toBeVisible();
  await page.getByRole("button", { name: /quick view: jira/i }).click();
  await expect(page.getByRole("dialog", { name: /jira → github autopilot/i })).toBeVisible();
  await expect(page.getByText(/automated the path from Jira issue/i)).toBeVisible();
  await expect(page).toHaveURL(/\/$/);
  await page.getByRole("button", { name: /close project details/i }).click();
  await expect(page.getByRole("link", { name: /read case study/i })).toHaveCount(0);
  await page.getByRole("button", { name: /quick view: twofold/i }).click();
  const hoverContrast = async () => {
    const liveProject = page.getByRole("link", { name: /visit live project/i });
    await liveProject.hover();
    return liveProject.evaluate((element) => {
      const parse = (value: string) => {
        // The browser interpolates animated colors in OKLab. Normalize any
        // supported CSS color to sRGB rather than assuming an rgb() string.
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = 1;
        const context = canvas.getContext("2d")!;
        context.fillStyle = value;
        context.fillRect(0, 0, 1, 1);
        return Array.from(context.getImageData(0, 0, 1, 1).data).slice(0, 3);
      };
      const luminance = (value: string) => {
        const channels = parse(value).map((channel) => {
          const normalized = channel / 255;
          return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
        });
        return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
      };
      const styles = getComputedStyle(element);
      const foreground = luminance(styles.color);
      const background = luminance(styles.backgroundColor);
      return (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05);
    });
  };
  expect(await hoverContrast()).toBeGreaterThanOrEqual(4.5);
  await page.getByRole("button", { name: /close project details/i }).click();
  await page.getByRole("button", { name: /toggle color theme/i }).click();
  await page.getByRole("button", { name: /quick view: twofold/i }).click();
  expect(await hoverContrast()).toBeGreaterThanOrEqual(4.5);
  await page.getByRole("button", { name: /close project details/i }).click();
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
