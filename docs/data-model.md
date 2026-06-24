# Data Model & Information Architecture

The contract for what objects exist, their properties, and why clicking an item takes
you where it does. Built for cross-team alignment and to inform the real build — there
should be no ambiguity about which entities and properties we have.

> Status: this describes the **intended** model. The prototype is mid-migration toward
> it (`app/src/data/` is the single source of truth; some screens still hold local
> fixtures and are being moved over).

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

## 5. Where the data lives (build guidance)

- One module per entity under `app/src/data/` (`projects`, `reports`, `users`,
  `deliverables`, `actions`, `sessions`, `decisions`). Components import from there and
  render via variables — **no inline fixtures duplicated across screens.**
- A reference is rendered by **one shared component** (`ReportRef` = avatar + `Name ·
  Stage Gate N`) so naming and icon are identical everywhere it appears, in both personas.
