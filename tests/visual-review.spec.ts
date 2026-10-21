import { test, expect } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";
const routes = [
  "/dashboard",
  "/dashboard/content",
  "/dashboard/design",
  "/dashboard/share",
  "/dashboard/analytics",
  "/dashboard/domain",
  "/create",
  "/create/content",
  "/create/setup",
  "/create/design",
  "/create/preview",
  "/login",
];
test("every route renders without errors or horizontal overflow", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator("html")).toHaveAttribute(
      "data-ui-lab-ready",
      "true",
    );
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      route,
    ).toBe(true);
  }
  expect(errors).toEqual([]);
});
test("capture the owner review screens", async ({ page }, testInfo) => {
  const width = testInfo.project.use.viewport?.width;
  test.skip(
    ![390, 768, 1440].includes(width || 0),
    "320px and 1100px are covered by overflow checks.",
  );
  const dir = path.resolve(
    process.env.CAPTURE_DIR || "review/screenshots",
    testInfo.project.name,
  );
  await mkdir(dir, { recursive: true });
  const capture = async (name: string) => {
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() =>
      Promise.all(
        Array.from(document.images).map((image) =>
          image.decode().catch(() => undefined),
        ),
      ),
    );
    await page.screenshot({
      path: path.join(dir, `${name}.png`),
      fullPage: !name.includes("editor") && name !== "design-previewing-bold",
      animations: "disabled",
    });
  };
  await page.goto("/dashboard");
  await expect(page.locator("html")).toHaveAttribute(
    "data-ui-lab-ready",
    "true",
  );
  await capture("overview");
  await page.goto("/dashboard/content");
  await expect(page.locator("html")).toHaveAttribute(
    "data-ui-lab-ready",
    "true",
  );
  await capture("content");
  if (width !== 768) {
    await page
      .getByRole("button", { name: "Edit Cappuccino", exact: true })
      .click();
    await expect(
      page.getByRole("dialog", { name: "Edit menu item" }),
    ).toBeVisible();
    await capture("content-editor");
    await page
      .getByRole("dialog", { name: "Edit menu item" })
      .getByRole("button", { name: "Close dialog" })
      .click();
  }
  await page.goto("/dashboard/design");
  await expect(page.locator("html")).toHaveAttribute(
    "data-ui-lab-ready",
    "true",
  );
  await capture("design");
  if (width === 768) return;
  await page.locator(".design-choice").filter({ hasText: "Bold" }).click();
  await expect(
    page.getByRole("button", { name: "Save design", exact: true }),
  ).toBeVisible();
  await capture("design-previewing-bold");
  await page.goto("/dashboard/share");
  await expect(page.locator("html")).toHaveAttribute(
    "data-ui-lab-ready",
    "true",
  );
  await capture("qr-share");
  if (width === 1440) {
    await page.goto("/dashboard/analytics");
    await expect(page.locator("html")).toHaveAttribute(
      "data-ui-lab-ready",
      "true",
    );
    await capture("analytics");
    await page
      .getByRole("button", { name: "UI Lab: preview zero activity" })
      .click();
    await capture("analytics-zero");
  }
  await page.goto("/dashboard/domain");
  await expect(page.locator("html")).toHaveAttribute(
    "data-ui-lab-ready",
    "true",
  );
  await page
    .getByRole("combobox", { name: "Domain visual state" })
    .selectOption("Waiting");
  await capture("domain-waiting-dns");
  if (width === 1440) {
    await page
      .getByRole("combobox", { name: "Domain visual state" })
      .selectOption("Connected");
    await capture("domain-connected");
    await page.goto("/create");
    await expect(page.locator("html")).toHaveAttribute(
      "data-ui-lab-ready",
      "true",
    );
    await capture("onboarding-business");
    await page.goto("/create/content");
    await expect(page.locator("html")).toHaveAttribute(
      "data-ui-lab-ready",
      "true",
    );
    await capture("onboarding-content");
  }
  await page.goto("/create/design");
  await expect(page.locator("html")).toHaveAttribute(
    "data-ui-lab-ready",
    "true",
  );
  await capture("onboarding-design");
  if (width === 1440) {
    await page.goto("/create/preview");
    await expect(page.locator("html")).toHaveAttribute(
      "data-ui-lab-ready",
      "true",
    );
    await capture("final-preview");
    await page.goto("/login");
    await expect(page.locator("html")).toHaveAttribute(
      "data-ui-lab-ready",
      "true",
    );
    await capture("login");
  }
});
