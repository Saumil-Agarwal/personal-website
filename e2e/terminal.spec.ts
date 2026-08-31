import { expect, test } from "@playwright/test";

test("terminal and command palette work", async ({ page }) => {
  await page.goto("/");
  const input = page.getByRole("textbox", { name: /terminal command/i });
  await input.fill("whoami");
  await input.press("Enter");
  await expect(page.getByText("Saumil Agarwal").last()).toBeVisible();
  await page.getByRole("button", { name: /open command palette/i }).click();
  await page.getByRole("textbox", { name: /search commands/i }).fill("projects");
  await page.getByRole("textbox", { name: /search commands/i }).press("Enter");
  await expect(page.locator("#projects")).toBeInViewport();
});
