# Repository Guidelines

This is the shared operating contract for Claude Code, Codex, OpenCode, and contributors. Keep instructions tool-neutral. Tool-specific configuration should reference this file rather than duplicate it.

## Domain Context

This product is a thin layer over Qiddiya's **Stage Gate governance process**; every screen maps to a step in that process or a role within it. **Before changing feature behaviour, copy, or process logic, read [`docs/stage-gate-context.md`](docs/stage-gate-context.md)** — it defines the gates, roles, end-to-end workflow, decision types, and glossary, and flags client-specific `[CONFIRM]` items. If a control doesn't serve that process, question it rather than guessing.

- **Project team** — owns delivery; prepares and submits Stage Gate packs; goal: approval to the next gate. Persona accent **Qiddiya Blue `#001B72`**.
- **Secretariat** — operates governance on behalf of CDU: intake, completeness, coordinate review, record decisions; goal: a consistent, compliant process. Persona accent **Teal `#0E7C86`**.
- **Process in one line:** Project Team submits → Secretariat checks completeness → reviewers/SGRP assess → decision (approve / approve-with-conditions / rework / reject) → Secretariat tracks and communicates outcomes.
- Do not invent client-specific facts (gate names, criteria, integrations) — leave `[CONFIRM]` and ask.

## Engineering Principles

This is a **clickable prototype** for stakeholder review, not production infrastructure. Match effort to that — when in doubt, do less.

- **Build the smallest implementation that satisfies the requirement.** Minimise code changes; shortest correct diff wins.
- **Prefer simple solutions over extensible frameworks.** No speculative future-proofing, no scaffolding "for later".
- **Do not introduce an abstraction until the same thing is duplicated 3+ times** (rule of three). Until then, inline it.
- **Prefer modifying existing files over creating new ones.** Don't add new layers, folders, or util/data/domain modules speculatively. (Exception: the established one-component-per-file convention under `features/` and `components/` — follow it; this rule targets new *abstractions*, not splitting a genuinely reused component.)
- **Match existing repository patterns exactly.** No opportunistic refactors, renames, or reformatting of files a task doesn't already change.
- **Avoid new dependencies unless explicitly requested**, and do not bump major framework/tooling versions opportunistically.
- **Right-size the engineering.** The auth gate is a demo lock, not a security boundary; the data is fixtures, not a schema. Don't harden or generalise beyond prototype needs. Fake actions use `toast()` — don't build backends for them.

## Repository Layout

The product is a Next.js 14 (App Router), React 18, and TypeScript application under `app/`.

- `app/src/app/layout.tsx` and `app/src/app/page.tsx`: App Router entry. `page.tsx` mounts the client SPA (`App.tsx`) via a `dynamic(..., { ssr: false })` import.
- `app/src/App.tsx`: SPA view composition.
- `app/src/app/`: App Router routes plus shared state and application context (`AppContext.tsx`). The LLM proxy route is `app/src/app/api/ai/route.ts`.
- `app/src/middleware.ts`: basic-auth gate (production only).
- `app/src/components/`: reusable UI organized under `layout/` and `ui/`.
- `app/src/features/`: workflow-specific screens grouped by domain (`project/`, `secretariat/`, `settings/`, and `tour/`).
- `app/src/styles.css`: global styles and design tokens.

The code separates by concern, not by deployment (Next.js is one app on Vercel):

- `app/src/server/`: **server-only** code, never bundled to the browser (guarded by the `server-only` package). `server/data/` is the single source of truth for application data — `getSeed()` reads Postgres when `DATABASE_URL` is set, fixtures otherwise. `server/db/` holds the Drizzle schema, client, and seed.
- `app/src/lib/types.ts`: shared, isomorphic types used by both server and client.
- `app/src/data/store.ts`: **client** cache, hydrated once from `GET /api/seed` at boot (see `Bootstrap` in `App.tsx`). Components read from here; they never hardcode data.

Do not edit generated `app/.next/`, `app/drizzle/` migrations (regenerate with `db:generate`), or dependency-managed `app/node_modules/`.

## Agent Workflow

Before editing, read this file, inspect `git status --short`, and open relevant implementation and configuration files. Existing changes belong to the user or another agent: do not revert, overwrite, format, or include them unless the task requires it. Keep changes narrowly scoped and avoid opportunistic refactors.

When requirements are ambiguous, prefer the smallest reversible implementation consistent with existing patterns. Do not add dependencies, alter deployment/authentication, or modify lockfiles without a task-specific reason. In the handoff, list changed files, validation performed, and any unresolved or pre-existing failures.

Work only on `main`. Keep the local Next.js dev server running during implementation so saved application-code changes appear immediately through hot module replacement. After each completed, validated unit of work, create a focused local commit on `main` with the required `Co-Authored-By` trailer. Do not push or deploy until the user explicitly chooses to update production.

Codex-specific low-friction permissions live in [`.codex/config.toml`](.codex/config.toml), with narrowly scoped command allowances in [`.codex/rules/default.rules`](.codex/rules/default.rules). Keep shared workflow requirements here in `AGENTS.md`; do not duplicate tool-specific configuration. Routine workspace edits, validation, local commits, network reads, and the checked-in deploy workflow should proceed automatically. Destructive commands, credential access, writes outside the workspace, and unrelated external side effects must remain guarded.

## Development and Validation

Run commands from `app/`:

- `npm ci`: install the locked dependency set.
- `npm run dev`: start the Next.js development server.
- `npm run check`: format-check, type-check, and build in one command.
- `npm run build`: create the production build in `app/.next/`.
- `npm run start`: serve the production build locally.

While `npm run dev` is running, Next.js watches `app/` and updates the local page automatically on save. The basic-auth gate is skipped in development, so the local app is open. Local development does not update Vercel.

The shared `POST /api/ai` endpoint (route handler at `app/src/app/api/ai/route.ts`) accepts an OpenAI-compatible `messages` array and proxies to any OpenAI-compatible inference server. It requires `LLM_BASE_URL` and `LLM_MODEL`; set `LLM_API_KEY` when the server requires bearer authentication. Set these through untracked `app/.env.local` for local development (for example Ollama at `http://127.0.0.1:11434/v1`) and through Vercel env vars in production. Never expose them to the browser (no `NEXT_PUBLIC_` prefix) or call the inference server directly from client code.

**Data and database.** All app data is served from `GET /api/seed`; the client never hardcodes it. With no `DATABASE_URL` the server returns fixtures, so the app runs fully offline. To use Postgres locally, set `DATABASE_URL` in untracked `app/.env.local` (a Neon branch or local Postgres), then from `app/`: `npm run db:migrate` to apply migrations and `npm run db:seed` to load the fixtures. After changing `app/src/server/db/schema.ts`, run `npm run db:generate` and commit the generated `app/drizzle/` migration. In production, set `DATABASE_URL` as a Vercel env var (a Neon database from the Vercel Marketplace injects it automatically).

No test runner or linter is configured. Run `npm run check` for every code change. Manually verify affected views and both personas when shared behavior changes. Report failing baseline checks exactly; do not silently fix unrelated defects.

## Deploy

Production is a single Vercel project (`stagegate`) whose **Root Directory is `app/`** so Vercel detects the Next.js app there. It is aliased to **stagegate.vercel.app**, gated by basic-auth Next middleware (`BASIC_AUTH_USER` / `BASIC_AUTH_PASSWORD` env). This is the one canonical flow — do not invent variations.

After all changes are committed on `main`, run `./deploy` from the repository root. It validates the app, pushes `main`, builds locally (`vercel build`), ships the prebuilt output (`vercel deploy --prebuilt --prod`), and verifies the expected **401** auth gate. It stops before deployment if the branch is not `main`, the working tree is dirty, validation fails, or the live response is unexpected. The local build relies on the linked project's Root Directory being set to `app/`; a fresh clone must set that in Vercel project settings before its first deploy.

**Multiple agents share `main`.** Before pushing or running `./deploy`, run `git pull --rebase origin main` so you build on the latest commits and don't hit a rejected push or a merge bubble. Commit your own work first (a clean tree), then rebase, then deploy. Only one agent should edit or commit at a time; other agents may inspect or review concurrently.

Do not change `app/src/middleware.ts`, `app/next.config.mjs`, or the Vercel project's Root Directory (build, routing, auth) without a task-specific reason.

## Code Conventions

Use functional React components, strict TypeScript, two-space indentation, single quotes, and semicolons. Use PascalCase for components/files, camelCase for variables/functions, and existing kebab-case or BEM-like CSS naming. Keep domain logic inside its feature directory; move code to `components/` only when it is reused. Prefer existing CSS custom properties over hard-coded colors. Preserve nearby style when no formatter enforces a rule.

## Commits and Reviews

Follow the concise scoped history style, for example `React migration: interactive topbar`. Keep commits focused. Pull requests should describe behavior, validation, linked issues, and deployment or authentication impact. Include before/after screenshots for visible UI changes. Never commit credentials; configure `BASIC_AUTH_USER` and `BASIC_AUTH_PASSWORD` through the hosting environment.
