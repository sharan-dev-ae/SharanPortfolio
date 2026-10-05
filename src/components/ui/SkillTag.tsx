import type { Skill } from "@/types/skill";
import { Badge } from "./Badge";

export function SkillTag({ skill }: { skill: Skill }) {
  return <Badge title={skill.category}>{skill.name}</Badge>;
}
