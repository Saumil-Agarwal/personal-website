import { expect, test } from "@playwright/test";

test("AI chat, theme, and contact assets work", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /agentic ai project/i }).click();
  await expect(page.getByText(/Jira → GitHub Autopilot/)).toBeVisible();
  await page.getByRole("button", { name: /toggle color theme/i }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.getByRole("link", { name: /email saumil/i })).toHaveAttribute("href", /mailto:/);
  const response = await page.request.get("/saumil-agarwal-resume.pdf");
  expect(response.ok()).toBeTruthy();
});
