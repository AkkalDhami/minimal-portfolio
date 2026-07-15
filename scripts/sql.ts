import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const src = path.join(
  __dirname,
  "..",
  "node_modules",
  "sql.js",
  "dist",
  "sql-wasm.wasm"
);

const destDir = path.join(__dirname, "..", "public", "playground");
const dest = path.join(destDir, "sql-wasm.wasm");

if (!fs.existsSync(src)) {
  console.warn(`[copy-sql-wasm] Could not find ${src} — is sql.js installed?`);
  process.exit(0);
}

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

fs.copyFileSync(src, dest);

console.log("[copy-sql-wasm] Copied sql-wasm.wasm to public/playground/");
