import type { Persona, View } from '../../app/AppContext';

export type Placement = 'top' | 'right' | 'bottom' | 'left';
export interface TourStep {
  id: string;
  role: Persona;          // which shell this step belongs to
  view: View;             // screen to navigate to before showing the step
  target: string | null;  // CSS selector; null (or absent) → centered tooltip
  placement: Placement;
  title: string;
  body: string;
}

export const TOUR_STEPS: TourStep[] = [
  // ── Project Team ──
  { id: 'p-home', role: 'project', view: 'dashboard', target: '.view--dashboard .banner', placement: 'bottom',
    title: 'Start from your workspace', body: 'Open an existing Stage Gate report or create a new draft. This page shows active reports, pending actions, deadlines and AI tools.' },
  { id: 'p-draft', role: 'project', view: 'authoring', target: '.view--authoring .ws-left', placement: 'right',
    title: 'Generate the first draft', body: 'Upload project deliverables and pick the Stage Gate template. AI writes the first draft — the project team stays accountable for the final content.' },
  { id: 'p-review', role: 'project', view: 'authoring', target: '.view--authoring .ws-mid', placement: 'left',
    title: 'Review every section', body: 'Check each AI-generated section for quality, accuracy, completeness and source coverage before marking it reviewed.' },
  { id: 'p-exec', role: 'project', view: 'execsummary', target: '.view--execsummary .es-gen-btn', placement: 'right',
    title: 'Create the executive summary', body: 'Generate a leadership-ready summary from the reviewed report, then check confidence and traceability before using it.' },
  { id: 'p-readiness', role: 'project', view: 'readiness', target: '.view--readiness .rs-scan-go', placement: 'right',
    title: 'Validate before submission', body: 'Run the readiness scan to check mandatory documents, unresolved conditions, advisory warnings and checklist completeness.' },
  { id: 'p-submit', role: 'project', view: 'readiness', target: null, placement: 'bottom',
    title: 'Submit the validated pack', body: 'Once the pack passes validation, submit it to the Secretariat for completeness review and Stage Gate processing.' },
  // ── Secretariat ──
  { id: 's-home', role: 'secretariat', view: 'dashboard', target: '.sec-dash .banner', placement: 'bottom',
    title: 'Start from the intake queue', body: 'New Stage Gate submissions land here. Open the latest submission to begin the secretariat review.' },
  { id: 's-details', role: 'secretariat', view: 'reports', target: '.sec-rep-detail', placement: 'left',
    title: 'Review the submission', body: 'Check the project overview, submitted documents, highlights and decision sought before running the completeness scan.' },
  { id: 's-scan', role: 'secretariat', view: 'reports', target: '.sec-rep-actions .btn', placement: 'left',
    title: 'Validate the pack', body: 'Run the completeness scan to confirm the pack includes every required document before sharing it with the review panel.' },
  { id: 's-sgrp', role: 'secretariat', view: 'scan', target: '.scan-runbtn', placement: 'right',
    title: 'Send to the review panel', body: 'Once the pack passes the scan, prepare the package for the Stage Gate Review Panel.' },
  { id: 's-pre', role: 'secretariat', view: 'scan', target: null, placement: 'bottom',
    title: 'Review the panel email', body: 'Review the AI-drafted email, recipients, attachments and scan summary before copying it into Outlook or sending manually.' },
  { id: 's-post', role: 'secretariat', view: 'reports', target: null, placement: 'bottom',
    title: 'Prepare the outcome communication', body: 'Review and amend the AI-drafted outcome letter and meeting minutes before sending the final communication to the project team.' },
];
