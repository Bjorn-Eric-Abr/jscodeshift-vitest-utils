import path from "path";
import { fileURLToPath } from "url";
import { defineTest } from "../lib/testUtils";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

defineTest(__dirname, "MyTransform", {}, "MyTransform", { parser: "tsx" });
