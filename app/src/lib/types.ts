// Shared, isomorphic types used by both the server data layer and the client.
// No data or runtime code here — types only, so it is safe to import anywhere.

export type Persona = 'project' | 'secretariat';
export type ProjectView = 'dashboard' | 'authoring' | 'execsummary' | 'readiness' | 'reports';
export type SecretariatView = 'dashboard' | 'reports' | 'scan';
export type View = ProjectView | SecretariatView;

export interface Project {
  id: string;
  name: string;
  initials: string;
  stageGate: string;
  stageGateShort: string;
  sector: string;
  capitalAsk: string;
}

export interface UserProfile {
  initials: string;
  shortName: string;
  fullName: string;
  role: string;
  email: string;
  color: string;
}

export type ActionDue = 'red' | 'amber' | 'grey';

export interface ReportAction {
  id: string;
  reportId: string;
  title: string;
  due: string; // "Due today" | "Due 15 Jun" | "No deadline"
  dueVariant: ActionDue;
}

export interface DashboardReport {
  id: string;
  status: string;
  tone: 'amber' | 'green' | 'grey' | 'blue';
  sub: string;
}

export interface Deadline {
  title: string;
  reportId: string;
  day: string;
  mon: string;
  rel: string;
}

export interface AiTool {
  title: string;
  desc: string;
  chip: string;
  tag: string;
  illus: string;
  muted?: boolean;
}

export interface ProjectDashboardData {
  reports: DashboardReport[];
  deadlines: Deadline[];
  tools: AiTool[];
}

export interface TimelineStep {
  label: string;
  date?: string;
  state: 'done' | 'current' | 'todo';
  cur?: boolean;
}

/** A run of reviewer-message text; `strong` parts render emphasised. */
export interface RfiMessagePart {
  text: string;
  strong?: boolean;
}

export interface Rfi {
  from: string;
  meta: string;
  due: string;
  message: RfiMessagePart[];
}

export interface ActiveReport {
  id: string;
  name: string;
  gate: string;
  dot: string;
  pillClass: string;
  pillText: string;
  timeline: TimelineStep[];
  reviewer: string;
  session: string;
  rfi?: Rfi;
}

export interface DraftReport {
  name: string;
  sub: string;
  dot: string;
}

export interface CompletedReport {
  name: string;
  sub: string;
  pill: string;
  variant: 'green' | 'amber';
}

export interface MyReportsData {
  active: ActiveReport[];
  drafts: DraftReport[];
  completed: CompletedReport[];
}

/** A document with a display name and a "FORMAT · size" meta string. */
export interface FileRef {
  name: string;
  meta: string;
}

export interface AuthoringSectionBody {
  section: number; // 0-indexed
  body: RfiMessagePart[];
}

export interface AuthoringData {
  files: FileRef[];
  sections: string[];
  sectionBodies: AuthoringSectionBody[];
}

export interface SecretariatKpi {
  label: string;
  num: string;
  tag: string;
  variant: string;
}

export interface FunnelStage {
  label: string;
  num: number;
  mod: string;
}

export interface SecretariatSubmission {
  name: string;
  gate: string;
  chip: string;
  dot: string;
  chipMod?: string;
}

export interface SecretariatRec {
  title: string;
  sub: string;
  mod: string;
}

export interface SecretariatPanel {
  name: string;
  date: string;
  pill: string;
}

export interface IntakeQueueItem {
  name: string;
  gate: string;
  date: string;
  dot: string;
}

export interface Fact {
  k: string;
  v: string;
}

export interface PanelMember {
  initials: string;
  color: string;
}

export interface OutcomeItem {
  name: string;
  sub: string;
  date: string;
  pill: string;
  variant: 'amber' | 'green';
  selected?: boolean;
}

export interface SecretariatData {
  kpis: SecretariatKpi[];
  funnel: FunnelStage[];
  submissions: SecretariatSubmission[];
  recs: SecretariatRec[];
  panels: SecretariatPanel[];
  intake: {
    queue: IntakeQueueItem[];
    facts: Fact[];
    docs: FileRef[];
    overview: string;
    highlights: string[];
    decisionSought: string;
  };
  scanPanel: PanelMember[];
  outcomes: {
    list: OutcomeItem[];
    conditions: string[];
    minutes: string[];
    minutesSummary: string;
  };
}

/** Everything the client needs at boot, served by GET /api/seed. */
export interface SeedData {
  projects: Project[];
  users: Record<Persona, UserProfile>;
  actions: ReportAction[];
  projectDashboard: ProjectDashboardData;
  myReports: MyReportsData;
  authoring: AuthoringData;
  secretariat: SecretariatData;
}
