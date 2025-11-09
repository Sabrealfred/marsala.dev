# Growth Analytics Schema

dbt models and event definitions we use to keep marketing, product, and RevOps in sync.

## Contents

- `models/` — fact / dim tables for leads, product usage, lifecycle, experiments
- `macros/` — helpers for event validation, SLA calculations, segmentation
- `tracking-plan/` — YAML definitions that map Segment/PostHog events to dbt sources
- `docs/` — governance playbook + SLAs

## Getting Started

```bash
npx degit Sabrealfred/marsala.dev/open-source/growth-analytics-schema analytics-schema
cd analytics-schema
cp .env.example .env
dbt deps
dbt run
```

Point the sources to your warehouse (Snowflake, BigQuery, Postgres) via `profiles.yml`.

## Highlights

- Opinionated metrics: PQLs, Sales Velocity, CAC payback, Experiment QoQ
- Built-in tests for freshness, duplicates, SLA compliance
- Ready-to-sync models for Hightouch / Census (Reverse ETL)

MIT Licensed. Contributions welcome via PR.
