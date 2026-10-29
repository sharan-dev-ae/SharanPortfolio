"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

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
      title="Page views reported by Vercel Web Analytics"
    >
      <Eye className="text-accent" size={14} aria-hidden="true" />
      <span className={compact ? "hidden xl:inline" : undefined}>
        Portfolio visits
      </span>
      <span className="text-foreground font-mono font-semibold">
        {views === null ? "—" : formatViews(views)}
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
