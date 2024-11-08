import path from "path";
import { fileURLToPath } from "url";
import { expect, test } from "vitest";
import { defineTest } from "../lib/testUtils";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test("it runts", () => {
  expect(true).toBe(true);
});

defineTest(__dirname, "MyTransform", {}, "MyTransform", { parser: "tsx" });
