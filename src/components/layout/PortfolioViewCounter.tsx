"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

const HISTORICAL_VISIT_ESTIMATE = 300;

export function PortfolioViewCounter({ compact = false }: { compact?: boolean }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/portfolio-views", { signal: controller.signal })
      .then((response) => response.json())
      .then((data: { views?: number }) => {
        if (typeof data.views === "number") setViews(data.views);
      })
      .catch(() => undefined);

    return () => controller.abort();
  }, []);

  return (
    <div
      className="border-border bg-surface inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs"
      title="Includes an estimated 300 historical visits plus Vercel Web Analytics page views"
    >
      <Eye className="text-accent" size={14} aria-hidden="true" />
      <span className={compact ? "hidden xl:inline" : undefined}>
        Estimated visits
      </span>
      <span className="text-foreground font-mono font-semibold">
        {views === null ? "—" : formatViews(HISTORICAL_VISIT_ESTIMATE + views)}
      </span>
    </div>
  );
}

function formatViews(views: number) {
  if (views < 1000) return views.toLocaleString("en-US");
  return `${new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(views)}+`;
}
