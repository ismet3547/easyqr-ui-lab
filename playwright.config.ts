import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  timeout: 30_000,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: process.env.BASE_URL || "http://127.0.0.1:4173",
    browserName: "chromium",
    reducedMotion: "reduce",
    trace: "retain-on-failure",
  },
  projects: [320, 390, 768, 1100, 1440].map((width) => ({
    name: `${width}px`,
    use: {
      viewport: {
        width,
        height:
          width === 768
            ? 1024
            : width === 390
              ? 844
              : width === 320
                ? 720
                : 900,
      },
    },
  })),
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: "npm run dev -- --webpack",
        url: "http://127.0.0.1:4173/dashboard",
        reuseExistingServer: !process.env.CI,
        timeout: 90_000,
      },
});
