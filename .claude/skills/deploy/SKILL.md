---
name: deploy
description: Commit, push, and deploy the Stage Gate Intelligence prototype to Vercel production, then verify the auth gate. Use when asked to deploy, ship, release, or "push it live".
---

# Deploy to production

Canonical flow — keep `AGENTS.md` § "Deploy" as the source of truth.

After committing all changes on `main`, run `./deploy` from the repository root. Report any failure exactly; do not bypass its branch, clean-tree, validation, deployment, or verification checks.

## Notes
- One Vercel project at the repo root → builds `app/`, output `app/dist`, aliased to **stagegate.vercel.app**.
- Auth is basic-auth middleware (`BASIC_AUTH_USER` / `BASIC_AUTH_PASSWORD` env). A `401` from the bare URL means it's working.
- Do **not** edit `vercel.json` or `middleware.js` (build, routing, auth) without a task-specific reason.
- Full visual verification needs the auth credentials; the `401` check only confirms the gate + that the deploy is reachable.
