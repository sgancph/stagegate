---
name: deploy
description: Commit, push, and deploy the Stage Gate Intelligence prototype to Vercel production, then verify the auth gate. Use when asked to deploy, ship, release, or "push it live".
---

# Deploy to production

Canonical flow — keep `AGENTS.md` § "Deploy" as the source of truth; these are the exact steps.

1. **Validate:** `cd app && npm run check` — must pass before going further. Fix failures or report them; do not deploy red.
2. **Commit** on the current working branch with a concise scoped message (e.g. `React migration: interactive topbar`). End the message with:
   `Co-Authored-By: Claude <noreply@anthropic.com>`
   Never commit credentials or `app/dist`.
3. **Push:** `git push origin <current-branch>`.
4. **Deploy** from the **repo root**: `vercel --prod --yes`.
5. **Verify:** `curl -s -o /dev/null -w "%{http_code}" https://stagegate.vercel.app` → expect **401** (the basic-auth gate is healthy, not an error). Confirm the deployment is `READY` and the build log shows `vite build` (it builds `app/` per `vercel.json`, not stale output).

## Notes
- One Vercel project at the repo root → builds `app/`, output `app/dist`, aliased to **stagegate.vercel.app**.
- Auth is basic-auth middleware (`BASIC_AUTH_USER` / `BASIC_AUTH_PASSWORD` env). A `401` from the bare URL means it's working.
- Do **not** edit `vercel.json` or `middleware.js` (build, routing, auth) without a task-specific reason.
- Full visual verification needs the auth credentials; the `401` check only confirms the gate + that the deploy is reachable.
