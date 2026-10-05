export const projectManagement = {
  subtitle: "End-to-End Project Execution & Progress Control",
  summary:
    "A large-scale enterprise platform designed to manage and monitor the project execution lifecycle. Teams can configure project structure, allocate progress percentages, forecast resources and financial milestones, and record site updates. Operational tracking and project-health monitoring come together to show where a project stands and where attention is needed.",
  businessProblem:
    "Complex projects involve material planning, manpower needs, billing expectations, collections, work packages, site updates, and completion tracking. When these are managed separately, the overall status becomes difficult to trust. The platform centralizes these dimensions so teams can see progress, upcoming needs, forecast gaps, delays, and areas that need intervention.",
  solution:
    "A continuously updated representation of execution, connecting planning, field progress, forecasting, and monitoring. Authorized users configure the project structure and work areas, assign percentage allocations, update site progress, forecast resources and financial milestones, and review project health.",
  structure:
    "Project teams define the systems, work packages, and activities that make up the execution scope. Each part can carry an appropriate contribution to overall progress, making completion a structured roll-up rather than a subjective status update.",
  progress:
    "The full project represents 100%. Systems and work packages receive allocations, and completed activities contribute toward those allocations as site updates are recorded. This gives teams a consistent model for measuring execution without implying a single fixed formula for every project.",
  site: "Site teams record progress against the configured structure. Those updates give project managers a more current view of actual execution and connect field activity with management reporting.",
  forecasts: [
    {
      title: "Material Forecasting",
      body: "Anticipates material requirements and their timing, helping teams see upcoming needs alongside execution progress.",
    },
    {
      title: "Manpower Forecasting",
      body: "Plans expected workforce demand against execution stages so resource needs are visible ahead of time.",
    },
    {
      title: "Invoice Forecasting",
      body: "Shows expected invoicing in the context of project progress and financial planning, without exposing commercial figures.",
    },
    {
      title: "Collection Management",
      body: "Keeps collection-related visibility alongside progress and invoicing forecasts, connecting operational execution with financial context.",
    },
  ],
  health:
    "Rather than only showing completed progress, the platform helps teams recognize where attention is required before a problem becomes critical. Areas behind plan, forecast gaps, execution delays, resource pressure, and financial concerns can be surfaced for review and corrective action.",
  management:
    "Detailed execution information rolls up into a clearer management view: overall completion, progress by system, areas behind plan, forecasts, collection status, and indicators requiring attention.",
  functionalAreas: [
    "Project structure configuration",
    "System and work-package definition",
    "Percentage allocation",
    "Site progress updates",
    "Progress monitoring",
    "Material forecasting",
    "Manpower forecasting",
    "Invoice forecasting",
    "Collection management",
    "Project health monitoring",
    "Attention-area identification",
    "Management reporting",
  ],
  contribution:
    "I contributed across the full stack to the development and evolution of the platform: translating project-control requirements into usable workflows, frontend interfaces, business logic, APIs, and database-driven progress tracking. My work connected forecasting, progress visibility, and reporting across project modules. This was collaborative development, not sole ownership.",
  contributionAreas: [
    "Frontend interfaces",
    "Backend APIs",
    "Database work",
    "Business workflows",
    "Dashboards and reporting",
    "Progress logic",
    "Module integration",
  ],
  challenges: [
    {
      title: "Complex Project Structures",
      body: "Many systems, work packages, and activities need to roll up into meaningful overall progress.",
    },
    {
      title: "Progress Accuracy",
      body: "A structured percentage model helps progress reflect execution instead of subjective estimates.",
    },
    {
      title: "Multiple Forecast Types",
      body: "Materials, manpower, invoicing, and collections are different planning dimensions tied to one project lifecycle.",
    },
    {
      title: "Field-to-Management Visibility",
      body: "Site updates need to become clear, actionable information for project managers and leadership.",
    },
    {
      title: "Evolving Business Rules",
      body: "The workflow and reporting model need to accommodate changing operational requirements.",
    },
  ],
  outcome: [
    "Centralized project execution tracking",
    "More consistent progress measurement",
    "Clearer visibility across project stages",
    "Better material and manpower planning",
    "Financial forecast visibility",
    "Stronger link between site updates and management reporting",
    "Earlier awareness of areas needing attention",
  ],
} as const;
