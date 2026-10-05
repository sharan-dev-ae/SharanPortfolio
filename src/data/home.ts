import { siteConfig } from "@/config/site";

export const heroContent = {
  introduction:
    "I build enterprise software, scalable business applications, and modern digital systems across frontend, backend, data, and architecture.",
} as const;

export const heroFacts = [
  {
    value: siteConfig.engineeringExperience,
    label: "Software Engineering Experience",
  },
  { value: siteConfig.uaeExperience, label: "UAE Experience" },
  { value: siteConfig.location, label: "Current Location" },
  { value: siteConfig.primaryDomain, label: "Primary Domain" },
] as const;

export const stats = [
  { value: siteConfig.engineeringExperience, label: "Software Engineering" },
  { value: siteConfig.uaeExperience, label: "UAE Experience" },
  { value: "Enterprise", label: "Applications & Systems" },
  { value: "Full-Stack", label: "Engineering" },
] as const;

export const engineeringApproach = [
  {
    title: "Understand the Problem",
    description:
      "Good software starts before the first line of code. I break down the process, understand the people using it, and find where software can genuinely simplify the work.",
  },
  {
    title: "Shape the Experience",
    description:
      "I lean toward the frontend and product side: shaping layouts, workflows, dashboards, interactions, and visual hierarchy so complex processes feel clear and intuitive.",
  },
  {
    title: "Build It End-to-End",
    description:
      "Once the experience is clear, I take it through the stack: Angular and TypeScript, .NET APIs and business logic, SQL Server, integrations, and deployment.",
  },
] as const;

export const impactAreas: Array<{
  title: string;
  description: string;
  metric?: string;
}> = [
  {
    title: "Enterprise systems",
    description:
      "Business applications spanning complex organizational workflows.",
  },
  {
    title: "Workflow automation",
    description:
      "Approval and processing flows designed to reduce manual effort.",
  },
  {
    title: "Decision support",
    description:
      "Forecasting, reporting, and dashboards for operational visibility.",
  },
  {
    title: "System integration",
    description: "Reliable connections between services, data, and teams.",
  },
];
