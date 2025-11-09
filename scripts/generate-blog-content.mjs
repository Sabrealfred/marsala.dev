#!/usr/bin/env node
// @ts-check

import fs from "fs";
import path from "path";
import { blogEntries } from "../content/blog-data.mjs";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

if (!fs.existsSync(BLOG_DIR)) {
  fs.mkdirSync(BLOG_DIR, { recursive: true });
}

const author = "Marina Álvarez";

const escapeQuotes = (str) => str.replace(/"/g, '\\"');
const escapeInline = (value) =>
  value.replace(/</g, "&lt;").replace(/>/g, "&gt;");

const formatArray = (items) =>
  items.map((item) => `  - "${escapeQuotes(item)}"`).join("\n");

const bodyFromEntry = (entry) => {
const stack = entry.stack.map((item) => `- ${escapeInline(item)}`).join("\n");
const playbook = entry.playbook
  .map((item, idx) => `${idx + 1}. ${escapeInline(item)}`)
  .join("\n");
const metrics = entry.metrics.map((item) => `- ${escapeInline(item)}`).join("\n");
const lessons = entry.lessons.map((item) => `- ${escapeInline(item)}`).join("\n");

  return `
# ${entry.title}

> ${entry.signal}

## Context

${escapeInline(entry.context)}

## Stack I leaned on

${stack}

## Playbook

${playbook}

## Metrics & telemetry

${metrics}

## What stuck with me

${lessons}

## What I'm building next

${escapeInline(entry.next)}

---

Want me to help you replicate this module? [Drop me a note](/contact) and we’ll build it together.
`.trim();
};

blogEntries.forEach((entry) => {
  const frontmatter = `---
title: "${escapeQuotes(entry.title)}"
slug: "${entry.slug}"
type: "${entry.type}"
summary: "${escapeQuotes(entry.summary)}"
description: "${escapeQuotes(entry.description)}"
date: "${entry.date}"
readingTime: "${entry.readingTime}"
author: "${author}"
tags:
${formatArray(entry.tags)}
keywords:
${formatArray(entry.keywords)}
featured: ${entry.featured}
image: "${entry.image}"
---
`;

  const content = `${frontmatter}\n\n${bodyFromEntry(entry)}\n`;
  const filePath = path.join(BLOG_DIR, `${entry.slug}.mdx`);
  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`✓ Generated ${entry.slug}.mdx`);
});

console.log("All blog posts generated ✅");
