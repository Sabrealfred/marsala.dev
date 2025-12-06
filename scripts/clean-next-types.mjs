#!/usr/bin/env node
import fs from "fs";
import path from "path";

const root = process.cwd();
const targets = [
  path.join(root, ".next", "types"),
  path.join(root, ".next", "cache", "tsconfig.tsbuildinfo"),
];

targets.forEach((target) => {
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
    console.log(`🧹 Removed ${path.relative(root, target)}`);
  }
});
