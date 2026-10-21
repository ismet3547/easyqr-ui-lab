import { test, expect } from "@playwright/test";
test("search, edit, visibility and delete update local menu state", async ({
  page,
}) => {
  await page.goto("/dashboard/content");
  await page
    .getByRole("textbox", { name: "Search menu items" })
    .fill("Cappuccino");
  await expect(page.locator(".resource-row")).toHaveCount(2);
  await page
    .getByRole("button", { name: "Edit Cappuccino", exact: true })
    .click();
  const editor = page.getByRole("dialog", { name: "Edit menu item" });
  await editor
    .getByRole("textbox", { name: "Name", exact: true })
    .fill("House Cappuccino");
  await editor.getByRole("switch", { name: "Visible on page" }).click();
  await editor.getByRole("button", { name: "Save changes" }).click();
  await expect(editor).not.toBeVisible();
  const row = page.getByRole("button", {
    name: "Edit House Cappuccino",
    exact: true,
  });
  await expect(row).toContainText("Hidden");
  await row.click();
  await editor.getByRole("button", { name: "Delete", exact: true }).click();
  const confirm = page.getByRole("dialog", { name: "Delete this menu item?" });
  await expect(confirm).toBeVisible();
  await confirm.getByRole("button", { name: "Cancel", exact: true }).click();
  await expect(editor).toBeVisible();
  await editor.getByRole("button", { name: "Delete", exact: true }).click();
  await confirm
    .getByRole("button", { name: "Delete item", exact: true })
    .click();
  await expect(row).toHaveCount(0);
  await expect(page.getByRole("status")).toHaveText(/Menu item deleted/);
});
test("design preview supports discard and save", async ({ page }) => {
  await page.goto("/dashboard/design");
  await page.locator(".design-choice").filter({ hasText: "Bold" }).click();
  await expect(page.locator(".public-preview")).toHaveClass(/preview-bold/);
  await page.getByRole("button", { name: "Discard", exact: true }).click();
  await expect(page.locator(".public-preview")).toHaveClass(/preview-clean/);
  await expect(
    page.getByRole("button", { name: "Save design", exact: true }),
  ).toHaveCount(0);
  await page.locator(".design-choice").filter({ hasText: "Bold" }).click();
  await page.getByRole("button", { name: "Save design", exact: true }).click();
  await expect(page.locator(".current-design-name")).toContainText("Bold");
  const home = page.viewportSize()!.width <= 700 ? "Home" : "Overview";
  await page.getByRole("link", { name: home, exact: true }).click();
  await expect(page.locator(".summary-list")).toContainText("Bold");
});
test("analytics ranges and zero activity, domain states and download", async ({
  page,
}) => {
  await page.goto("/dashboard/analytics");
  await page.getByRole("button", { name: "7 days", exact: true }).click();
  await expect(page.locator(".analytics-primary")).toHaveText("318");
  await page
    .getByRole("button", { name: "UI Lab: preview zero activity" })
    .click();
  await expect(
    page.getByRole("heading", { name: "No activity yet" }),
  ).toBeVisible();
  await page.goto("/dashboard/domain");
  await page.getByRole("button", { name: "Connect", exact: true }).click();
  await expect(page.getByText("Complete these two DNS records.")).toBeVisible();
  await page.getByRole("button", { name: "Check again", exact: true }).click();
  await expect(page.getByText("Domain ownership verified")).toBeVisible();
  await page.getByRole("button", { name: "Check status", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Connected securely" }),
  ).toBeVisible();
  await page.goto("/dashboard/share");
  await page.getByRole("button", { name: "Large", exact: true }).click();
  const pending = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download PNG" }).click();
  const download = await pending;
  expect(download.suggestedFilename()).toBe("acme-coffee-qr-2048.png");
});
test("drawer traps focus and Escape returns it to the row", async ({
  page,
}) => {
  await page.goto("/dashboard/content");
  const row = page.getByRole("button", {
    name: "Edit Cappuccino",
    exact: true,
  });
  await row.focus();
  await row.press("Enter");
  const dialog = page.getByRole("dialog", { name: "Edit menu item" });
  await expect(dialog).toBeVisible();
  for (let i = 0; i < 18; i++) {
    await page.keyboard.press("Tab");
    expect(
      await dialog.evaluate((el) => el.contains(document.activeElement)),
    ).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(row).toBeFocused();
});
test("mobile More preserves Analytics and Domain navigation", async ({
  page,
}) => {
  test.skip(page.viewportSize()!.width > 700, "Mobile navigation only.");
  await page.goto("/dashboard");
  const nav = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(nav.getByRole("link")).toHaveCount(4);
  await nav.getByRole("button", { name: "More", exact: true }).click();
  const more = page.getByRole("dialog", { name: "More", exact: true });
  await more.getByRole("link", { name: "Analytics", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Analytics", exact: true }),
  ).toBeVisible();
  await expect(more).not.toBeVisible();
});
