// Retain the existing Visual Lab QA workflow entrypoint and artifact location.
import { spawn } from "node:child_process";
const child = spawn(
  process.execPath,
  ["node_modules/@playwright/test/cli.js", "test"],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      BASE_URL: process.env.BASE_URL || "http://127.0.0.1:3000",
      CAPTURE_DIR: process.env.CAPTURE_DIR || "screenshots",
    },
  },
);
child.on("error", (error) => {
  console.error(error);
  process.exitCode = 1;
});
child.on("exit", (code) => {
  process.exitCode = code ?? 1;
});
