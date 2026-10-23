import type { Metadata } from "next";
import { InvictusDashboard } from "@/components/prototypes/InvictusDashboard";

export const metadata: Metadata = {
  title: "Invictus — Personal Execution System",
  description: "Explore the interactive Invictus planning workflow and open the live product.",
};

export default function InvictusPage() {
  return <InvictusDashboard />;
}
