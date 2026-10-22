import type { Metadata } from "next";
import { OrchestraDashboard } from "@/components/prototypes/OrchestraDashboard";

export const metadata: Metadata = {
  title: "Orchestra — AI Development Command Center",
  description: "A functional local-first AI development orchestration prototype with projects, task planning, simulated agent sessions, and usage analytics.",
};

export default function OrchestraPage() {
  return <OrchestraDashboard />;
}
