import type { Metadata } from "next";
import { DeploymentMonitoringBuildDetail } from "@/components/prototypes/DeploymentMonitoringBuildDetail";

export const metadata: Metadata = {
  title: "Build Details — Automated Deployment Monitoring",
  description: "Simulated CI/CD build timeline, approval, logs, and deployment verification.",
};

export default async function BuildDetailPage({ params }: PageProps<"/prototypes/automated-deployment-monitoring/build/[id]">) {
  const { id } = await params;
  return <DeploymentMonitoringBuildDetail buildId={id} />;
}
