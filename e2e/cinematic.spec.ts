import { expect, test } from "@playwright/test";

test("scroll unfolds the architecture; pause restores every discipline", async ({ page, viewport }) => {
  test.skip(!viewport || viewport.width <= 760, "desktop scroll scene");
  await page.goto("/");
  const scene = page.locator("#architecture");
  await expect(scene).toHaveAttribute("data-animated", "true");
  await scene.evaluate((element) => window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY + (element.clientHeight - window.innerHeight) * .85, behavior: "instant" }));
  await expect(scene.locator('[aria-current="step"] h3')).toHaveText("Intelligence↗");
  await page.getByRole("button", { name: "Pause animations" }).click();
  await expect(scene).toHaveAttribute("data-animated", "false");
  expect(await page.locator("html").evaluate(element => getComputedStyle(element).scrollBehavior)).toBe("auto");
  for (const title of ["Systems", "Security", "Intelligence"]) {
    await expect(scene.getByRole("heading", { name: title, exact: false })).toBeVisible();
  }
  await page.getByRole("button", { name: "Resume animations" }).click();
  await expect(scene).toHaveAttribute("data-animated", "true");
});

test("reduced motion keeps all chapters readable without a pinned scene", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("#architecture")).toHaveAttribute("data-animated", "false");
  expect(await page.locator(".neural-orbit").evaluate((element) => getComputedStyle(element).animationName)).toBe("none");
  await expect(page.locator(".discipline")).toHaveCount(3);
  for (const chapter of await page.locator(".discipline").all()) await expect(chapter).toBeVisible();
});

test("content and project destinations survive without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(baseURL!);
  await expect(page.getByRole("heading", { level: 1, name: "Saumil Agarwal" })).toBeVisible();
  for (const chapter of await page.locator(".discipline").all()) await expect(chapter).toBeVisible();
  await expect(page.getByRole("link", { name: "View projects" })).toHaveAttribute("href", "#projects");
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
