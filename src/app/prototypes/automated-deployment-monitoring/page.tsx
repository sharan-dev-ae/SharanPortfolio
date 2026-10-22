import type { Metadata } from "next";
import { DeploymentMonitoringDashboard } from "@/components/prototypes/DeploymentMonitoringDashboard";

export const metadata: Metadata = {
  title: "Automated Deployment Monitoring — Interactive Prototype",
  description: "A frontend-only CI/CD monitoring and production approval prototype using realistic mock data.",
};

export default function AutomatedDeploymentMonitoringPrototypePage() {
  return <DeploymentMonitoringDashboard />;
}
