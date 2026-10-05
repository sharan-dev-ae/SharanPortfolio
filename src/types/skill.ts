export type SkillCategory =
  "Backend" | "Frontend" | "Database" | "Architecture" | "DevOps / Cloud";

export interface Skill {
  name: string;
  category: SkillCategory;
}
