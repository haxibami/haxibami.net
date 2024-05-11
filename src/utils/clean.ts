import fs from "node:fs";
import path from "node:path";

const publicCacheDir = path.join(process.cwd(), "./public/.cache");
const destCacheDir = path.join(process.cwd(), "./dist/.cache");

await Promise.allSettled([
  fs.promises.rm(publicCacheDir, { recursive: true }),
  fs.promises.rm(destCacheDir, { recursive: true }),
]);
