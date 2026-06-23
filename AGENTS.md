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

The product is a Vite, React 18, and TypeScript application under `app/`.

- `app/src/main.tsx` and `app/src/App.tsx`: application entry points and view composition.
- `app/src/app/`: shared state and application context.
- `app/src/components/`: reusable UI organized under `layout/` and `ui/`.
- `app/src/features/`: workflow-specific screens grouped by domain (`project/`, `secretariat/`, `settings/`, and `tour/`).
- `app/src/styles.css`: global styles and design tokens.
- `middleware.js` and `vercel.json`: authentication and deployment routing.

Do not edit generated `app/dist/` or dependency-managed `app/node_modules/`.

## Agent Workflow

Before editing, read this file, inspect `git status --short`, and open relevant implementation and configuration files. Existing changes belong to the user or another agent: do not revert, overwrite, format, or include them unless the task requires it. Keep changes narrowly scoped and avoid opportunistic refactors.

When requirements are ambiguous, prefer the smallest reversible implementation consistent with existing patterns. Do not add dependencies, alter deployment/authentication, or modify lockfiles without a task-specific reason. In the handoff, list changed files, validation performed, and any unresolved or pre-existing failures.

## Development and Validation

Run commands from `app/`:

- `npm ci`: install the locked dependency set.
- `npm run dev`: start the Vite development server.
- `npx tsc --noEmit`: run strict TypeScript validation.
- `npm run build`: create the production bundle in `app/dist/`.
- `npm run preview`: serve the built bundle locally.

No test runner or linter is configured. For every code change, run TypeScript validation and the production build. Manually verify affected views and both personas when shared behavior changes. Report failing baseline checks exactly; do not silently fix unrelated defects.

## Code Conventions

Use functional React components, strict TypeScript, two-space indentation, single quotes, and semicolons. Use PascalCase for components/files, camelCase for variables/functions, and existing kebab-case or BEM-like CSS naming. Keep domain logic inside its feature directory; move code to `components/` only when it is reused. Prefer existing CSS custom properties over hard-coded colors. Preserve nearby style when no formatter enforces a rule.

## Commits and Reviews

Follow the concise scoped history style, for example `React migration: interactive topbar`. Keep commits focused. Pull requests should describe behavior, validation, linked issues, and deployment or authentication impact. Include before/after screenshots for visible UI changes. Never commit credentials; configure `BASIC_AUTH_USER` and `BASIC_AUTH_PASSWORD` through the hosting environment.
