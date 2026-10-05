import { cn } from "@/lib/utils";

export type VisualKind =
  | "dashboard"
  | "structure"
  | "forecast"
  | "workflow"
  | "health"
  | "lifecycle"
  | "roles"
  | "ems-dashboard"
  | "architecture"
  | "opportunity"
  | "modules";

const labels: Record<VisualKind, string> = {
  dashboard: "Project Execution Overview",
  structure: "Project Structure",
  forecast: "Forecast Planning",
  workflow: "Site Progress Workflow",
  health: "Project Health",
  lifecycle: "Estimation Lifecycle",
  roles: "Role Workflow",
  "ems-dashboard": "Workflow Dashboard",
  architecture: "Workflow Architecture",
  opportunity: "Opportunity Journey",
  modules: "Module Overview",
};

function Panel({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-border bg-background/60 rounded-xl border p-5",
        className,
      )}
    >
      <p className="text-secondary text-xs tracking-[.14em] uppercase">
        {title}
      </p>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function Track({ label, width }: { label: string; width: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between gap-3 text-sm">
        <span>{label}</span>
        <span className="text-secondary">Illustrative</span>
      </div>
      <div className="bg-border h-2 rounded-full">
        <div className="bg-accent h-2 rounded-full" style={{ width }} />
      </div>
    </div>
  );
}

export function ProjectConceptVisual({
  kind,
  className,
}: {
  kind: VisualKind;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "border-border bg-surface relative overflow-hidden rounded-2xl border p-5 sm:p-8",
        className,
      )}
      aria-label={`Conceptual visual: ${labels[kind]}`}
    >
      <div className="border-border mb-7 flex flex-wrap items-center justify-between gap-3 border-b pb-5">
        <p className="text-accent text-xs font-semibold tracking-[.18em] uppercase">
          {labels[kind]}
        </p>
        <span className="text-secondary text-xs">Conceptual visualization</span>
      </div>
      {kind === "dashboard" && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Panel title="Overall completion">
            <p className="text-5xl font-semibold tracking-tight">68%</p>
            <p className="text-secondary mt-3 text-xs">Illustrative value</p>
          </Panel>
          <Panel title="System progress" className="space-y-5">
            <Track label="Package A" width="76%" />
            <Track label="Package B" width="52%" />
          </Panel>
          <Panel title="Attention areas">
            <p className="text-xl font-semibold text-amber-300">
              Review required
            </p>
            <p className="text-secondary mt-3 text-sm">
              Forecast and schedule signals in one view.
            </p>
          </Panel>
        </div>
      )}
      {kind === "structure" && (
        <div className="mx-auto max-w-xl space-y-3 text-center">
          <div className="border-accent/50 bg-accent/10 rounded-xl border p-4 font-semibold">
            Project
          </div>
          <div className="text-accent">↓</div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="border-border rounded-xl border p-4">
              System / Work Package A
            </div>
            <div className="border-border rounded-xl border p-4">
              System / Work Package B
            </div>
          </div>
          <div className="text-accent">↓</div>
          <div className="border-border mx-auto max-w-sm rounded-xl border p-4">
            Activities &amp; execution items
          </div>
          <div className="text-accent">↓</div>
          <div className="border-accent/50 bg-accent/10 mx-auto max-w-sm rounded-xl border p-4">
            Allocated progress contribution
          </div>
        </div>
      )}
      {kind === "forecast" && (
        <div className="grid gap-3 sm:grid-cols-2">
          {["Materials", "Manpower", "Invoicing", "Collections"].map(
            (name, index) => (
              <Panel key={name} title={name}>
                <div className="flex h-16 items-end gap-2">
                  {[35, 55, 43, 72, 61].map((height, i) => (
                    <span
                      key={i}
                      className={cn(
                        "bg-accent/50 w-full rounded-t-sm",
                        index % 2 === 1 && "bg-accent/35",
                      )}
                      style={{ height: `${height + index * 3}%` }}
                    />
                  ))}
                </div>
                <p className="text-secondary mt-3 text-xs">
                  Illustrative planning trend
                </p>
              </Panel>
            ),
          )}
        </div>
      )}
      {kind === "workflow" && (
        <ol className="grid gap-3 md:grid-cols-3">
          {[
            "Project structure",
            "Site user",
            "Progress update",
            "Calculated progress",
            "Management view",
            "Attention area",
          ].map((step, index) => (
            <li
              key={step}
              className="border-border bg-background/60 flex items-center gap-4 rounded-xl border p-4"
            >
              <span className="text-accent font-mono text-sm">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-medium">{step}</span>
            </li>
          ))}
        </ol>
      )}
      {kind === "health" && (
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { name: "On track", color: "text-emerald-300" },
            { name: "Attention required", color: "text-amber-300" },
            { name: "At risk", color: "text-rose-300" },
          ].map((item) => (
            <Panel key={item.name} title="Project signal">
              <p className={cn("text-xl font-semibold", item.color)}>
                {item.name}
              </p>
              <p className="text-secondary mt-3 text-sm">
                Review progress, forecasts, and upcoming needs.
              </p>
            </Panel>
          ))}
        </div>
      )}
      {kind === "lifecycle" && (
        <ol className="grid gap-3 sm:grid-cols-5">
          {[
            "CRM Opportunity",
            "Reviews",
            "Estimation",
            "Pricing",
            "Quotation",
          ].map((step, index) => (
            <li
              key={step}
              className="border-border bg-background/60 rounded-xl border p-4"
            >
              <span className="text-accent font-mono text-xs">
                0{index + 1}
              </span>
              <p className="mt-4 font-medium">{step}</p>
            </li>
          ))}
        </ol>
      )}
      {kind === "roles" && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Sales Coordinator",
            "Technical",
            "Marketing / CRM",
            "Estimation Head",
            "Estimator",
            "Pricing",
            "Quotation Team",
          ].map((role) => (
            <Panel key={role} title="Responsible team">
              <p className="font-medium">{role}</p>
            </Panel>
          ))}
        </div>
      )}
      {kind === "ems-dashboard" && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Active opportunities",
            "Pending approvals",
            "Estimation queue",
            "Pricing stage",
            "Quotation status",
          ].map((item, index) => (
            <Panel key={item} title={item}>
              <p className="text-accent text-3xl font-semibold">
                {[12, 4, 7, 3, 5][index]}
              </p>
              <p className="text-secondary mt-2 text-xs">
                Fictional demonstration count
              </p>
            </Panel>
          ))}
        </div>
      )}
      {kind === "architecture" && (
        <div className="mx-auto max-w-xl space-y-3 text-center">
          {[
            "Angular frontend",
            "ASP.NET Core API",
            "Business / workflow logic",
            "SQL Server",
          ].map((layer, index) => (
            <div key={layer}>
              <div className="border-accent/30 bg-background/60 rounded-xl border p-4 font-medium">
                {layer}
              </div>
              {index < 3 && <p className="text-accent py-2">↓</p>}
            </div>
          ))}
        </div>
      )}
      {kind === "opportunity" && (
        <ol className="grid gap-3 md:grid-cols-2">
          {[
            "Opportunity intake",
            "Technical and business review",
            "Estimator assignment",
            "Detailed estimation",
            "Pricing and adjustments",
            "Quotation preparation",
          ].map((step, index) => (
            <li
              key={step}
              className="border-border bg-background/60 flex gap-4 rounded-xl border p-4"
            >
              <span className="text-accent font-mono text-sm">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      )}
      {kind === "modules" && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Opportunity Intake",
            "Approval Workflow",
            "Estimation",
            "Pricing",
            "Quotation",
            "Engineering Integration",
          ].map((module) => (
            <Panel key={module} title="Platform area">
              <p className="font-medium">{module}</p>
            </Panel>
          ))}
        </div>
      )}
    </figure>
  );
}
