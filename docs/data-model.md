# Data Model & Information Architecture

The contract for what objects exist, their properties, and why clicking an item takes
you where it does. Built for cross-team alignment and to inform the real build — there
should be no ambiguity about which entities and properties we have.

> Status: this describes the **intended** model. Migration is partial — the core
> entities (Project, User, Action) are served from the database/fixtures via
> `GET /api/seed`; the report, session, decision, deliverable, and secretariat screens
> still hold local fixtures. Section 6 is the inventory and plan to finish the move.

---

## 1. Entities

### Project
A development being delivered (a district, asset, or attraction). Long-lived.
- `id`, `name` (e.g. "Arena"), `sector` (e.g. "Sports"), `initials` (avatar, e.g. "AR").
- Has **many Reports** over its life (one per gate it goes through).

### Report  *(a.k.a. Stage Gate submission — the central entity)*
One project's package for **one gate**. This is what everything else hangs off.
- `id`, `projectId`, `stageGate` ("Stage Gate 3"), `stageGateShort` ("SG3")
- `ownerId` (Project-team User), `status` (`drafting` | `submitted` | `in-review` | `decided`)
- `pipelineStage` (`intake` | `completeness` | `review` | `decision` | `closed`)
- `capitalAsk`, `submittedDate`, `assignedReviewerId`, `sessionId`, `completenessScan` (`pass` | `fail` | null), `readinessPct`
- Derived label everywhere: **`{project.name} · {stageGate}`** ("Arena · Stage Gate 3").

### User
- `id`, `name`, `shortName`, `email`, `role`, `persona` (`project` | `secretariat`).
- Reviewers/committee members are Users too (e.g. "A. ElHusseini, CDU reviewer").

### Deliverable  *(document)*
A source/submitted file. Belongs to a Report.
- `id`, `reportId`, `name`, `format` (PDF/DOCX/XLSX), `size`, `status` (`uploaded` | `processing` | `restructure-needed`).

### Action  *(RFI / task)*
Something the report owner must do. Belongs to a Report, usually raised by a reviewer.
- `id`, `reportId`, `title`, `type` (`rfi` | `task`), `dueDate` (date | null), `status`.

### Session  *(SGRP — Stage Gate Review Panel)*
A committee sitting that decides reports. Reports are scheduled into one.
- `id`, `number` (15), `date`, `panelMemberIds[]`.

### Decision
The outcome of a Session for a Report. One per decided Report.
- `id`, `reportId`, `sessionId`, `outcome` (`approved` | `approved-with-conditions` | `rework` | `rejected`), `conditions[]`, `letter`, `minutes`.

## 2. What is NOT an entity

- **Deadline** — *not* an entity. It's a **derived view of dated things**: a Report's gate
  submission deadline, an Action's `dueDate`, or a Session's `date`. "Upcoming deadlines"
  is just a sorted feed of those dates. So clicking a deadline opens the **thing the date
  belongs to** (its Report or Action), never a standalone "deadline".
- **Status pill / avatar / "pending action"** — presentation of the entities above, not
  data of their own.

## 3. Relationships

```
Project 1 ──── * Report
Report  * ──── 1 User (owner)         Report 1 ──── * Deliverable
Report  1 ──── * Action               Report * ──── 1 Session (scheduled)
Report  1 ──── 0..1 Decision (after the session)
```

## 4. Click-through rules (the consistency contract)

Clicking any reference to an entity must land on a screen that **shows that entity**, and
it must behave the same in both personas.

| You click… | Project team lands on | Secretariat lands on |
|---|---|---|
| a **Report** (row, banner, search, avatar) | My reports → that report selected | Submissions → that submission selected |
| an **Action / RFI** | My reports → that report, the action in view | Submissions → that report, the action in view |
| a **Deadline** | the Report (or Action) the date belongs to | same |
| a **Deliverable** | the Report's documents | the Report's documents |

Rule of thumb: **the same Report id flows through navigation** (`selectReport(id)` →
view shows it). No dead ends, no "clicked Arena, landed on a list that doesn't highlight
Arena".

## 5. Where the data lives (current architecture)

Data is separated by concern — Next.js is one app on Vercel, so there is no separate
backend service, just server-only modules the client can't import:

- **Server (source of truth):** `app/src/server/data/` holds the data and is the only
  place that knows where it comes from — Postgres (Drizzle, `app/src/server/db/`) when
  `DATABASE_URL` is set, fixtures otherwise. One file per entity.
- **API:** `GET /api/seed` returns everything the client needs at boot. Server-only code
  is guarded by the `server-only` package so it never reaches the browser bundle.
- **Client:** `app/src/data/store.ts` caches the seed (fetched once in `Bootstrap`,
  `App.tsx`); components read from it synchronously and **never hardcode data**.
- **Shared:** `app/src/lib/types.ts` holds the isomorphic entity types used by both sides.
- A reference is rendered by **one shared component** (`ReportRef` = avatar + `Name ·
  Stage Gate N`) so naming and icon are identical everywhere it appears, in both personas.

## 6. Server data inventory & migration plan

Every remaining hardcoded structure, where it should live, and how it is served.
**Stored** = a row served via `/api/seed`; **Derived** = computed from stored rows (do
not store); **UI config** = presentation, stays in the component.

| Component | Local fixture | Disposition |
|---|---|---|
| `ProjectDashboard` | `reports` | **Stored** — `Report.status` + `statusDetail` per project |
| | `deadlines` | **Derived** — sorted feed of Report/Session dates |
| | `tools` | **UI config** — AI feature cards (the data-bound chip reads the report) |
| `Reports` | `ACTIVE` | **Stored** — Report (timeline/`pipelineStage`, reviewer) + Session + Action (RFI) |
| | `drafts` | **Stored** — Reports with status `drafting` |
| | `completed` | **Stored** — Reports `decided` + their Decision |
| `AuthoringWorkspace` | `INITIAL_FILES` | **Stored** — Deliverable |
| | `SECTIONS` | **Stored** — Report section list (content/template) |
| `SecretariatDashboard` | `subs` | **Stored** — Reports (secretariat view) |
| | `panels` | **Stored** — Session |
| | `recs` | **Stored** — Action (secretariat-side task) |
| | `kpis`, `funnel` | **Derived** — counts/aggregates over Reports |
| `SecretariatIntake` | `queue` | **Stored** — Reports in intake |
| | `facts` | **Derived** — Project/Report fields already stored |
| | `docs` | **Stored** — Deliverable |
| | detail prose | **Stored** — Report content fields (`overview`, `highlights`, `decisionSought`) |
| `SecretariatScan` | `panel` | **Stored** — completeness-scan items (Action-like, per Report) |
| `SecretariatOutcomes` | `list` | **Stored** — decided Reports + Decision |
| | `conditions`, `minutes`, letter | **Stored** — Decision fields |

Genuine UI config that stays in components: settings toggle labels and nav, search
shortcuts (`STATIC_ITEMS`), tab/icon definitions.

### Conversion notes
- **RFI `message` is JSX today** (`<strong>…</strong>`). Store it as structured text
  (plain string, or `{ text, emphasis[] }`) and render the markup in the component — JSX
  cannot be serialized through the API.
- Long-form report prose (overview, highlights, decision letter, minutes) are **content
  fields** on Report/Decision — text columns, not separate entities.

### Order of work (once the tree is stable)
1. Extend `lib/types.ts` + `server/db/schema.ts`: full Report, Session, Decision,
   Deliverable; widen Action for RFI / scan-item / secretariat-task. Regenerate migration.
2. Expand fixtures in `server/data/` from each component's current values; widen `/api/seed`.
3. Point every component at `store.ts`, delete its local fixtures, compute KPIs/funnel.
4. `npm run db:generate && db:migrate && db:seed`; verify both personas; deploy.
