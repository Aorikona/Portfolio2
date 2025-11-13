import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
    css: false,
    include: ["src/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reportsDirectory: "./coverage/unit",
      reporter: ["text", "html"],
    },
  },
});

