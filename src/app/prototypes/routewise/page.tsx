import type { Metadata } from "next";
import { RouteWiseDashboard } from "@/components/prototypes/RouteWiseDashboard";

export const metadata: Metadata = {
  title: "RouteWise — Smart Route Comparison",
  description: "An interactive frontend prototype comparing Dubai routes by time, fuel, Salik tolls, and total trip expense.",
};

export default function RouteWisePage() {
  return <RouteWiseDashboard />;
}
