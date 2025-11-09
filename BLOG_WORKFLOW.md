# Blog Production Workflow

This repository expects every human‑written article to follow the same guardrails so another AI agent (or teammate) can jump in without context. Use this checklist whenever you create or edit blog content.

## Flow Overview

1. **Pick the source**
   - Update `content/blog-data.mjs` for auto-generated posts.
   - Set `manual: true` when a post will be handcrafted.
2. **Draft or expand the article**
   - Minimum length: **1,500 words** (manual posts should land between 1,500‑1,800 words).
   - Structure must include: Context, Stack/Architecture, Playbook (numbered), Metrics & Telemetry, Lessons, Next Steps/FAQ.
   - Add deep sections specific to the topic (e.g., risk matrix, governance rituals, case studies).
3. **Quality gates**
   - Escape HTML characters inside MDX (use `&lt;` / `&gt;` inside lists or code).
   - Ensure there is at least one Metrics list and one Lessons list per article.
   - Add an FAQ or implementation timeline when relevant.
4. **Validation**
   - Run `npm run lint`.
   - Run `npm run build` (auto-cleans `.next/types`).
5. **Ship**
   - `git add` relevant files + `scripts/clean-next-types.mjs` if touched.
   - `git commit -m "..."` and `git push`.
   - Deploy with `netlify deploy --prod --message "..."`.

## Manual Post Standards

| Section                | Requirement |
|------------------------|-------------|
| Context                | Explain the problem, constraints, and audience. |
| Stack / Architecture   | Bullet the exact tools/services plus diagrams or pseudo diagrams. |
| Playbook               | Numbered steps (minimum 5) with actionable detail. |
| Metrics & Telemetry    | Quantify before/after, SLAs, adoption, etc. |
| Governance / Risk      | Add risk matrices, roles, or councils. |
| Case Study / Timeline  | Provide real scenario or week-by-week plan. |
| FAQ / Next             | Answer common questions and tease the next improvement. |

## Tooling Notes

- **Generate boilerplate**: `npm run blog:generate` (skips manual posts).
- **MDX gotchas**: Use backticks or HTML entities for `<tag>` references. Avoid raw `&`.
- **Word count**: `wc -w content/blog/<slug>.mdx` (target ≥1500).

## Review & Deployment Checklist

- [ ] Article has required sections + metrics + lessons + FAQ.
- [ ] Word count ≥1500.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] Commit includes only relevant files.
- [ ] Netlify production deploy triggered.

Follow this document whenever a new AI agent is asked to expand posts; it contains everything needed without referencing chat history.
