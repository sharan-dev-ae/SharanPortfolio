import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    title: "EMS – Estimation Management System",
    slug: "ems-estimation-management-system",
    shortDescription:
      "A large-scale enterprise platform managing the estimation lifecycle—from CRM opportunity initiation and multi-stage approvals to technical evaluation, estimator processing, pricing adjustments, and quotation preparation.",
    homepageSummary:
      "From CRM opportunities and approvals to estimation, pricing, and quotation—one coordinated enterprise workflow.",
    businessProblem:
      "A multi-team estimation lifecycle needs clear ownership, status, and approvals across every handoff.",
    solution:
      "A controlled workflow connecting opportunities, reviews, estimation, pricing, and quotation preparation.",
    role: "Full-Stack Development / Enterprise Workflow Engineering",
    technicalFocus: "Multi-role estimation workflow orchestration",
    category: "Enterprise Estimation & Workflow Platform",
    technologies: ["Angular", "TypeScript", "ASP.NET Core", "C#", "SQL Server"],
    featured: true,
    homepagePriority: 1,
    highlight:
      "Complex multi-role workflow orchestration connecting sales, technical, marketing, CRM, estimation, and quotation teams.",
    image: "/images/projects/ems/lifecycle.png",
    visuals: [
      {
        type: "lifecycle",
        label: "Estimation Lifecycle",
        src: "/images/projects/ems/lifecycle.png",
        alt: "Illustrated EMS workflow from CRM opportunity creation through reviews, estimation, pricing, and quotation preparation",
      },
      {
        type: "roles",
        label: "Role Workflow",
        src: "/images/projects/ems/roles.png",
        alt: "Illustrated collaboration between EMS roles including sales coordination, technical, marketing, CRM, estimation, and quotation",
      },
      {
        type: "estimation",
        label: "Structured Estimation Process",
        src: "/images/projects/ems/estimation.png",
        alt: "Illustrated estimation stages from requirements and technical evaluation through pricing and quotation",
      },
      {
        type: "ecosystem",
        label: "Platform Ecosystem",
        src: "/images/projects/ems/ecosystem.png",
        alt: "Illustrated EMS platform modules and their connections",
      },
      {
        type: "shop-drawings",
        label: "Shop Drawing Workflow",
        src: "/images/projects/ems/shop-drawings.png",
        alt: "Illustrated conceptual shop drawing workflow integration from project input to approved release",
      },
      {
        type: "sales-order",
        label: "Sales Order Connection",
        src: "/images/projects/ems/sales-order.png",
        alt: "Illustrated conceptual flow from approved estimation through quotation to sales order handover",
      },
    ],
  },
  {
    title: "Sales Forecasting Platform",
    slug: "sales-forecasting-platform",
    shortDescription:
      "A planning system for turning sales data into actionable forecasts.",
    businessProblem:
      "Forecasting across teams can become fragmented and difficult to audit.",
    solution:
      "A structured platform for scenario planning, review, and reporting.",
    role: "Full-stack engineering",
    technicalFocus: "Data modeling and forecasting workflows",
    category: "Enterprise platform",
    year: 2025,
    technologies: ["ASP.NET Core", "Angular", "SQL Server"],
    featured: false,
    image: "/images/projects/enterprise-forecasting-platform.svg",
  },
  {
    title: "Project Management System",
    slug: "project-management-system",
    shortDescription:
      "A comprehensive enterprise platform for planning, tracking, and controlling project execution—combining progress monitoring, resource forecasts, financial forecasts, and site updates in one system.",
    homepageSummary:
      "Planning, field progress, forecasting, and project-health visibility brought together in one execution platform.",
    businessProblem:
      "Project structure, field progress, resources, and financial forecasts are difficult to assess when tracked separately.",
    solution:
      "A centralized project execution workflow that connects planning, forecasting, site updates, and project-health monitoring.",
    role: "Full-Stack Development / Enterprise Project Workflow Engineering",
    technicalFocus:
      "Structured progress, forecasting, and project-health visibility",
    category: "Enterprise Project Execution Platform",
    technologies: ["Angular", "TypeScript", "ASP.NET Core", "C#", "SQL Server"],
    featured: true,
    homepagePriority: 2,
    highlight:
      "End-to-end project tracking with structured progress allocation, forecasting, and risk visibility.",
    image: "/images/projects/project-management/execution.png",
    visuals: [
      {
        type: "execution",
        label: "Project Execution Workflow",
        src: "/images/projects/project-management/execution.png",
        alt: "Illustrated project execution workflow from structure setup through forecasting, site progress, invoicing, and project health",
      },
      {
        type: "planning",
        label: "Planning and Progress Control",
        src: "/images/projects/project-management/planning.png",
        alt: "Illustrated project structure, scope, weighted progress, and site progress workflow",
      },
      {
        type: "ecosystem",
        label: "Project Execution Ecosystem",
        src: "/images/projects/project-management/ecosystem.png",
        alt: "Illustrated connections between project structure, tracking, forecasting, and collection management",
      },
      {
        type: "site-progress",
        label: "Site Progress Updates",
        src: "/images/projects/project-management/site-progress.png",
        alt: "Illustrated site progress update process from scope setup to management review",
      },
      {
        type: "forecasting",
        label: "Forecasting Workflow",
        src: "/images/projects/project-management/forecasting.png",
        alt: "Illustrated material, manpower, invoice, and collection forecasting areas",
      },
      {
        type: "health",
        label: "Project Health",
        src: "/images/projects/project-management/health.png",
        alt: "Illustrated project health and attention areas from on track to action required",
      },
    ],
  },
  {
    title: "Alnouras App",
    slug: "alnouras-app",
    shortDescription:
      "A multi-module waste management operations platform connecting workforce, vehicles, trips, invoicing, dedicated routes, and operational visibility.",
    homepageSummary:
      "HR, payroll, vehicles, trip logging, invoicing, and map-based route monitoring in one operations platform.",
    businessProblem:
      "Office and field teams need a connected view of people, vehicles, routes, trips, and service progress.",
    solution:
      "A shared platform linking operational records, route assignments, trip activity, and management dashboards.",
    role: "Full-Stack Development / Operations Platform Engineering",
    technicalFocus:
      "Operations workflows, route visibility, and field-to-office coordination",
    category: "Enterprise Operations Platform",
    technologies: [],
    featured: true,
    homepagePriority: 3,
    highlight:
      "Dedicated routes, map-based vehicle visibility, trip execution, and operational dashboards.",
    image: "/images/projects/alnouras/route-tracking.png",
    visuals: [
      {
        type: "route-tracking",
        label: "Route Tracking",
        src: "/images/projects/alnouras/route-tracking.png",
        alt: "Alnouras App concept showing route tracking and service coverage across the UAE",
      },
      {
        type: "operations-workflow",
        label: "Operations Workflow",
        src: "/images/projects/alnouras/operations-workflow.png",
        alt: "Alnouras App concept showing workforce, fleet, route, trip, invoicing, and dashboard workflow",
      },
      {
        type: "platform-overview",
        label: "Connected Platform",
        src: "/images/projects/alnouras/platform-overview.png",
        alt: "Alnouras App concept showing connected operational modules around the platform",
      },
      {
        type: "route-progress",
        label: "Route Progress",
        src: "/images/projects/alnouras/route-progress.png",
        alt: "Alnouras App concept showing route progress and efficiency monitoring",
      },
    ],
  },
  {
    title: "Organization Management System",
    slug: "organization-management-system",
    shortDescription:
      "A central workspace for organizational structures and business workflows.",
    businessProblem:
      "Complex organizational data needs clear ownership and consistent access.",
    solution:
      "A structured application for teams, permissions, and operational processes.",
    role: "Full-stack engineering",
    technicalFocus: "Complex data relationships and access workflows",
    category: "Business systems",
    year: 2024,
    technologies: [".NET", "Angular", "TypeScript"],
    featured: false,
    image: "/images/projects/organization-management-system.svg",
  },
  {
    title: "Document Intelligence Platform",
    slug: "document-intelligence-platform",
    shortDescription:
      "A document workflow that combines processing, validation, and review.",
    businessProblem:
      "High-volume document work requires traceable review and validation.",
    solution:
      "A focused interface linking processing steps with human decisions.",
    role: "Full-stack engineering",
    technicalFocus: "Document processing and review flows",
    category: "Product platform",
    year: 2024,
    technologies: ["C#", "React", "REST APIs"],
    featured: false,
    image: "/images/projects/document-intelligence-platform.svg",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
