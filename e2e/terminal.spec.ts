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

test("terminal filesystem supports cd, ls, cat, and tab completion", async ({ page }) => {
  await page.goto("/");
  const input = page.getByRole("textbox", { name: /terminal command/i });
  await input.fill("cd projects");
  await input.press("Enter");
  await expect(page.locator("form .accent")).toHaveText("saumil@agarwal:~/projects$");
  await input.fill("cd jira");
  await input.press("Tab");
  await expect(input).toHaveValue("cd jira-github-autopilot/");
  await input.press("Enter");
  await expect(page.locator("form .accent")).toHaveText("saumil@agarwal:~/projects/jira-github-autopilot$");
  await input.fill("cat README.md");
  await input.press("Enter");
  await expect(page.getByText("# Jira → GitHub Autopilot")).toBeVisible();
  await input.fill("open .");
  await input.press("Enter");
  await expect(page).toHaveURL(/\/projects\/jira-github-autopilot$/);
});
