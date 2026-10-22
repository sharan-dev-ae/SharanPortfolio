export type BuildStatus =
  | "RUNNING"
  | "READY_FOR_APPROVAL"
  | "DEPLOYING"
  | "SUCCESS"
  | "FAILED"
  | "DISPATCH_FAILED"
  | "ROLLED_BACK";

export type AppKind = "frontend" | "backend";

export type MockBuild = {
  id: string;
  app: AppKind;
  name: string;
  status: BuildStatus;
  progress: number;
  branch: string;
  sha: string;
  author: string;
  started: string;
  ended?: string;
  duration: string;
  message: string;
};

export const mockBuilds: MockBuild[] = [
  { id: "WEB-2481", app: "frontend", name: "Frontend Application", status: "RUNNING", progress: 68, branch: "release/october", sha: "a9f42c1", author: "Aisha M.", started: "22 Oct 2026, 09:42:16", duration: "06m 18s", message: "Refine project cost summary" },
  { id: "API-1837", app: "backend", name: "Backend API", status: "READY_FOR_APPROVAL", progress: 100, branch: "main", sha: "7d21ea4", author: "Sharan K.", started: "22 Oct 2026, 09:16:04", ended: "22 Oct 2026, 09:26:58", duration: "10m 54s", message: "Harden approval audit trail" },
  { id: "WEB-2480", app: "frontend", name: "Frontend Application", status: "SUCCESS", progress: 100, branch: "main", sha: "c84bb17", author: "Ravi P.", started: "22 Oct 2026, 08:02:11", ended: "22 Oct 2026, 08:10:03", duration: "07m 52s", message: "Improve mobile estimates table" },
  { id: "API-1836", app: "backend", name: "Backend API", status: "SUCCESS", progress: 100, branch: "main", sha: "19afbc8", author: "Maya R.", started: "21 Oct 2026, 17:33:28", ended: "21 Oct 2026, 17:46:02", duration: "12m 34s", message: "Add cached quotation totals" },
  { id: "WEB-2479", app: "frontend", name: "Frontend Application", status: "FAILED", progress: 44, branch: "feature/export", sha: "e210b6c", author: "Noor A.", started: "21 Oct 2026, 15:10:49", ended: "21 Oct 2026, 15:15:12", duration: "04m 23s", message: "Export estimation workbook" },
  { id: "API-1835", app: "backend", name: "Backend API", status: "DISPATCH_FAILED", progress: 100, branch: "hotfix/tax", sha: "55bc921", author: "Sharan K.", started: "21 Oct 2026, 12:44:09", ended: "21 Oct 2026, 12:55:33", duration: "11m 24s", message: "Correct tax rounding" },
  { id: "WEB-2478", app: "frontend", name: "Frontend Application", status: "SUCCESS", progress: 100, branch: "main", sha: "a1160dd", author: "Aisha M.", started: "20 Oct 2026, 16:21:12", ended: "20 Oct 2026, 16:29:28", duration: "08m 16s", message: "Update project filters" },
  { id: "API-1834", app: "backend", name: "Backend API", status: "ROLLED_BACK", progress: 100, branch: "main", sha: "8e9c107", author: "Maya R.", started: "20 Oct 2026, 14:01:44", ended: "20 Oct 2026, 14:18:09", duration: "16m 25s", message: "Optimize document queries" },
];

export const workflowSteps = [
  { n: "01", title: "Build the exact commit", body: "A push builds the commit once, stages its immutable artifact, records a backup where applicable, then marks the build READY_FOR_APPROVAL." },
  { n: "02", title: "Verify the approver", body: "An authorized approver requests a one-time password and verifies it before production approval can continue." },
  { n: "03", title: "Deploy without rebuilding", body: "Approval dispatches the deployment workflow for that exact staged build. The source is not rebuilt or replaced." },
  { n: "04", title: "Report live progress", body: "Stage progress, deployment events, and verification results flow back into the dashboard." },
  { n: "05", title: "Rollback only when needed", body: "Rollback follows an actual deploy or verification failure. A telemetry failure is reported, but never triggers rollback." },
  { n: "06", title: "Retry safely", body: "A failed dispatch can be retried for the same approved build without repeating OTP approval." },
];

export const frontendStages = [
  { label: "Commit checkout", value: 26 },
  { label: "Build & test", value: 168 },
  { label: "Backup current", value: 42 },
  { label: "Verify artifact", value: 58 },
  { label: "Deploy", value: 74 },
];

export const backendStages = [
  { label: "Restore", value: 91 },
  { label: "Test", value: 146 },
  { label: ".NET publish", value: 212 },
  { label: "Stage + backup", value: 84 },
];

export const frontendWorkflow = [
  { label: "Commit", detail: "Resolve the exact pushed SHA" },
  { label: "Build", detail: "Install, test, and compile once" },
  { label: "Backup", detail: "Capture the current production bundle" },
  { label: "Verify", detail: "Validate checksum and staged files" },
  { label: "Approve", detail: "Authorized OTP production gate" },
  { label: "Deploy", detail: "Publish the approved artifact" },
  { label: "Rollback", detail: "Only after deploy or verification failure" },
];

export const backendWorkflow = [
  { label: "Commit", detail: "Resolve the exact pushed SHA" },
  { label: "Build", detail: "Test and publish the .NET artifact" },
  { label: "Approve", detail: "Authorized OTP production gate" },
  { label: "Deploy GREEN", detail: "Publish to the idle slot" },
  { label: "Verify", detail: "Health-check GREEN independently" },
  { label: "Traffic decision", detail: "Switch only after verification" },
  { label: "Rollback", detail: "Restore only on real deploy failure" },
];

export const weeklyRuns = [
  { day: "Thu", ui: 5, api: 4 }, { day: "Fri", ui: 7, api: 5 },
  { day: "Sat", ui: 2, api: 1 }, { day: "Sun", ui: 1, api: 2 },
  { day: "Mon", ui: 6, api: 6 }, { day: "Tue", ui: 8, api: 7 },
  { day: "Today", ui: 4, api: 3 },
];
