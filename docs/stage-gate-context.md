# Stage Gate Intelligence — Domain Context

> Why this exists: the product is a thin layer over Qiddiya's **Stage Gate governance
> process**. Every screen maps to a step in that process or a role within it. Refine the
> app against *this* document, not against UI guesses — if a control doesn't serve the
> process below, question it.
>
> Items marked **[CONFIRM]** are client-specific facts not yet verified — fill these in
> with CDU / the Secretariat before they're treated as ground truth.

---

## 1. What a Stage Gate process is

A Stage Gate process is the **governance spine** for capital investment projects
(districts, assets, attractions). A project may not spend the next tranche of money or
move to the next phase until it passes a **gate** — a formal review where a committee
decides whether the work done so far is good enough, complete enough, and aligned enough
to proceed.

Each gate forces three questions:

1. **Is it complete?** Are all the mandatory deliverables present? (completeness)
2. **Is it ready?** Is the content good enough to stand up to committee scrutiny? (readiness)
3. **Should it proceed?** Does the committee approve progression? (decision)

The point of the process is **consistency, control, and an auditable trail** of how
capital decisions were made.

## 2. The stages / gates

Projects progress through a sequence of Stage Gates (referred to in the app as
**SG1, SG2, SG3, …**). Each gate sits between two phases of work.

| Gate | Phase it closes | Typical intent | **[CONFIRM] official name & criteria** |
|------|-----------------|----------------|----------------------------------------|
| SG1  | Concept         | Strategic case / idea endorsed | … |
| SG2  | Feasibility / Definition | Feasibility & business case | … |
| SG3  | Design          | Detailed design sign-off + capital release | … |
| SG4  | Delivery / Construction | Readiness to build / award main works | … |
| SG5  | Operations / Handover | Operational readiness & close-out | … |

> The prototype uses Arena (SG3), Velodrome (SG2), National Tennis Centre (SG4),
> National Aquatic Centre (SG2) as sample projects. **[CONFIRM]** the real number of
> gates and each gate's official name + mandatory deliverable list.

## 3. The two primary user groups

### Project Team
- **Owns and delivers** a development project (district, asset, or attraction).
- **Prepares** the Stage Gate submission: report, business case, presentations, budgets,
  and supporting documents.
- **Goal:** obtain approval to move the project to the **next stage**.
- In the app they are: R. Hassan (sample user), persona accent **Qiddiya Blue**.

### Secretariat
- **Operates the Stage Gate governance process** on behalf of **CDU** (the governance owner).
- **Receives** submissions, **checks completeness**, **coordinates** reviewers and committees,
  manages workflow, **prepares committee packs**, **tracks actions**, and **records decisions**.
- **Goal:** ensure a **consistent, efficient, compliant** governance process.
- In the app they are: F. Osman (sample user), persona accent **Teal**.

### Supporting actors (referenced, not primary personas)
- **Reviewers** — subject-matter assessors (e.g. "A. ElHusseini, CDU lead") who raise
  requests-for-information (RFIs) and assess the pack.
- **SGRP — Stage Gate Review Panel** — the committee that issues the decision in a *session*.

## 4. The end-to-end workflow

```
PROJECT TEAM                         SECRETARIAT                         REVIEWERS / SGRP
────────────                         ───────────                         ────────────────
1. Prepare pack  ───────submit──▶    2. Receive @ intake
   (AI draft,                         3. Completeness scan
    exec summary,                        (all mandatory docs present?)
    readiness scan)                   4. Route to reviewers ──────────▶  5. Review + RFIs
                ◀──────RFI──────────     coordinate review                  assess pack
   respond to RFI ─────────────────▶                                     6. SGRP session
                                      7. Record decision  ◀──────────────   issue decision
                ◀──outcome letter───  8. Track actions /
                                         communicate outcome
```

**The five canonical steps** (governance view):

1. Project Team prepares and **submits** a Stage Gate package.
2. Secretariat reviews **completeness** and coordinates reviewers.
3. Reviewers and the committee **assess** the submission.
4. A **decision** is issued.
5. Secretariat **tracks actions** and communicates outcomes.

## 5. Decision types

A gate decision is one of:

- **Approve** — proceed to the next stage.
- **Approve with conditions** — proceed once named conditions are closed and evidenced
  (tracked by the Secretariat; e.g. Music Theme Park SG3 in the prototype).
- **Rework** — revise and resubmit before a decision.
- **Reject** — does not proceed.

## 6. Key artifacts & terminology (glossary)

| Term | Meaning |
|------|---------|
| **Submission pack** | The bundle a Project Team submits for a gate (report, business case, financial model, cost plan, etc.). |
| **Completeness scan** | Secretariat-side check that every *mandatory* document is present before review. Pass/fail. |
| **Readiness scan** | Project-Team-side pre-check that the pack will withstand committee scrutiny (mandatory docs, unresolved conditions, advisory warnings, checklist completeness). |
| **RFI** | Request for Information — a reviewer asks the Project Team to clarify/expand something. |
| **SGRP** | Stage Gate Review Panel — the deciding committee; meets in numbered **sessions**. |
| **Outcome letter** | Formal written decision sent to the Project Team after a session. |
| **Minutes** | Record of the committee session (the app AI-summarises these). |
| **Conditions** | Requirements attached to a conditional approval that must be closed before the next gate. |
| **CDU** | The unit that owns Stage Gate governance; the Secretariat acts on its behalf. **[CONFIRM]** full name. |
| **QIC** | Qiddiya Investment Company — the organisation. |

## 7. How the product supports each role

- **Help Project Teams create better submissions faster** — AI drafting (Draft Co-Pilot),
  executive summary generation, and a self-service readiness scan before they submit.
- **Help Secretariats review, coordinate and govern more efficiently** — intake queue,
  completeness scan, reviewer/panel coordination, committee packs, outcome letters &
  minutes, condition tracking.
- **Across both** — transparency, status tracking, AI-assisted review, and decision support
  across the full Stage Gate lifecycle.

## 8. Open questions to confirm with the client

- [ ] Official number of gates and each gate's **name + mandatory deliverable checklist**.
- [ ] Exact **decision vocabulary** (does "rework" exist, or only approve/conditional/reject?).
- [ ] Who can act as **reviewer** vs **committee member**, and is a reviewer persona needed?
- [ ] SGRP **cadence** (how often sessions run) and how submissions are scheduled into them.
- [ ] What "Open in Word" / the **Restructuring Word Engine** does in reality.
- [ ] Real **integrations** referenced in the UI (Microsoft Teams sync, Outlook, the QIC platform).
