import type { Skill, SkillCategory } from "@/types/skill";

export interface ExpertiseArea {
  title: string;
  category: SkillCategory;
  description: string;
  capabilities: string[];
  subtitle?: string;
}

export const expertiseAreas: ExpertiseArea[] = [
  {
    title: "Frontend Engineering",
    category: "Frontend",
    subtitle: "Where engineering meets experience.",
    description:
      "Frontend is the part of the stack I naturally gravitate toward. I translate complex requirements into structured, responsive interfaces—from enterprise workflows and dashboards to reusable components and interaction patterns.",
    capabilities: [
      "Component architecture",
      "Responsive interfaces",
      "Dashboard design",
      "Complex enterprise forms",
      "Data-heavy interfaces",
      "Reusable UI systems",
      "Interaction design",
      "Visual hierarchy",
      "Performance",
      "User experience thinking",
    ],
  },
  {
    title: "Backend Engineering",
    category: "Backend",
    description:
      "Reliable APIs and business logic for enterprise applications, with maintainability, performance, and clear responsibilities in mind.",
    capabilities: [
      "API design",
      "Business logic",
      "Authentication and authorization",
      "Workflow services",
      "Integrations",
      "Real-time functionality",
    ],
  },
  {
    title: "Data & SQL",
    category: "Database",
    description:
      "The data layer behind complex enterprise workflows, including stored procedures, reporting queries, and performance-sensitive operations.",
    capabilities: [
      "Database design",
      "Complex SQL",
      "Query optimization",
      "Reporting data",
      "Data modelling",
    ],
  },
  {
    title: "Architecture & Integration",
    category: "Architecture",
    description:
      "Connecting services and workflows into systems that can evolve as business needs change.",
    capabilities: [
      "Enterprise architecture",
      "Microservices",
      "REST integrations",
      "Real-time systems",
      "Workflow architecture",
      "Serverless concepts",
    ],
  },
  {
    title: "Delivery & Cloud",
    category: "DevOps / Cloud",
    description:
      "Comfortable taking applications beyond local development and supporting their delivery.",
    capabilities: ["CI/CD", "Deployment", "Git", "Jenkins"],
  },
];

export const skills: Skill[] = [
  { name: "Angular", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "JavaScript", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "HTML", category: "Frontend" },
  { name: "CSS", category: "Frontend" },
  { name: ".NET", category: "Backend" },
  { name: "ASP.NET Core", category: "Backend" },
  { name: "C#", category: "Backend" },
  { name: "REST APIs", category: "Backend" },
  { name: "Dapper", category: "Backend" },
  { name: "Entity Framework Core", category: "Backend" },
  { name: "SignalR", category: "Backend" },
  { name: "SQL Server", category: "Database" },
  { name: "Stored Procedures", category: "Database" },
  { name: "Database Design", category: "Database" },
  { name: "Query Optimization", category: "Database" },
  { name: "Enterprise Architecture", category: "Architecture" },
  { name: "Microservices", category: "Architecture" },
  { name: "API Integration", category: "Architecture" },
  { name: "Real-Time Systems", category: "Architecture" },
  { name: "CI/CD", category: "DevOps / Cloud" },
  { name: "Docker", category: "DevOps / Cloud" },
  { name: "AWS", category: "DevOps / Cloud" },
  { name: "IIS", category: "DevOps / Cloud" },
];
