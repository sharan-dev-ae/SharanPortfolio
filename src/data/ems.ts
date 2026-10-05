export const emsCaseStudy = {
  subtitle: "Estimation Management System",
  overview:
    "EMS is a large-scale enterprise application managing the estimation lifecycle from CRM opportunity initiation through multi-stage review, estimator processing, pricing, and quotation preparation. It connects several teams in one controlled, role-aware workflow.",
  problem:
    "Estimation crosses departments and approval stages. Without a shared workflow, status, ownership, pending actions, and handoffs can fragment across sales coordination, technical review, marketing and CRM, estimation leadership, estimators, pricing, and quotation teams.",
  workflow: [
    "CRM Opportunity",
    "Sales Coordinator",
    "Technical Review",
    "Marketing / CRM Approval",
    "Estimation Head",
    "Estimator Assignment",
    "Detailed Estimation",
    "Pricing & Adjustments",
    "Quotation Team",
    "Quotation Preparation",
  ],
  intake:
    "The relevant business team or Sales Coordinator initiates an opportunity with the project and commercial context needed for downstream review. Structured intake establishes ownership and traceability from the beginning.",
  approvals:
    "Review and approval stages route work between responsible teams. Role-based actions, approval or rejection handling, validations, and visible ownership help each team understand what is pending and what happens next.",
  management:
    "After required reviews, estimation leadership can allocate work, monitor estimator responsibility, track activity, and hand opportunities to the next stage. EMS manages the process around estimation as well as the eventual output.",
  estimator:
    "Estimators work through assigned activities, manage estimation information, update workflow state, and prepare outputs for later commercial stages. This description intentionally avoids undisclosed calculation rules.",
  pricing:
    "Processed estimation work moves into pricing and commercial preparation. The workflow supports controlled adjustments and a clear handover to quotation without revealing internal pricing rules.",
  quotation:
    "Quotation preparation continues from the reviewed opportunity and processed estimation. The platform preserves continuity from opportunity to technical evaluation, estimation, pricing, and final quotation work.",
  roles: [
    "Sales Coordinator",
    "Technical Team",
    "Marketing",
    "CRM",
    "Estimation Management",
    "Estimators",
    "Quotation Team",
  ],
  roleDescription:
    "EMS is built around responsibilities rather than one shared interface. Users encounter role-relevant queues, actions, approvals, and process visibility as an opportunity moves between teams.",
  evolving:
    "The platform continues to evolve as estimation and engineering workflows become more closely connected. This is an ongoing direction, not a claim that every proposed integration is already live.",
  contribution:
    "I contributed across the full stack to EMS development and evolution, working on Angular interfaces, reusable components, ASP.NET Core APIs, SQL Server logic, and multi-role workflow behavior. The work translated operational processes into structured application flows across reviews, estimation, pricing, and handoffs.",
  contributionAreas: [
    "Angular interfaces",
    "Reusable components",
    "ASP.NET Core APIs",
    "SQL Server and stored procedures",
    "Workflow logic",
    "Business validations",
    "Role-based behavior",
    "Module integration",
  ],
  challenges: [
    {
      title: "Complex Workflow State",
      body: "An opportunity can move across many teams and stages, with a changing owner, available actions, and next step.",
    },
    {
      title: "Role-Based Behavior",
      body: "Different users need different permissions, queues, actions, and visibility.",
    },
    {
      title: "Business Rule Complexity",
      body: "Detailed operational requirements extend well beyond a simple form or CRUD flow.",
    },
    {
      title: "Cross-Functional Coordination",
      body: "Teams with different responsibilities need one consistent view of an opportunity.",
    },
    {
      title: "Evolving Workflow",
      body: "Business processes change, so the application needs room for continued refinement.",
    },
  ],
  outcomes: [
    "Centralized estimation lifecycle",
    "Clearer workflow and responsibility visibility",
    "Structured approvals",
    "More consistent handoffs between teams",
    "Better continuity from opportunity to quotation",
    "Reduced fragmented coordination",
  ],
} as const;
