const analyticsEndpoint =
  "https://api.vercel.com/v1/query/web-analytics/visits/count";

export async function GET() {
  const token = process.env.VERCEL_API_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  const organizationId = process.env.VERCEL_ORG_ID;

  if (!token || !projectId) {
    return Response.json(
      { views: null, configured: false },
      { headers: { "Cache-Control": "public, s-maxage=300" } },
    );
  }

  const url = new URL(analyticsEndpoint);
  url.searchParams.set("projectId", projectId);
  if (organizationId?.startsWith("team_")) {
    url.searchParams.set("teamId", organizationId);
  }

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return Response.json(
        { views: null, configured: true },
        { status: 502, headers: { "Cache-Control": "no-store" } },
      );
    }

    const payload: unknown = await response.json();
    const views = readCount(payload);

    return Response.json(
      { views, configured: true },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } },
    );
  } catch {
    return Response.json(
      { views: null, configured: true },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}

function readCount(payload: unknown): number | null {
  if (typeof payload === "number") return payload;
  if (!payload || typeof payload !== "object") return null;

  const value = payload as Record<string, unknown>;
  for (const key of ["count", "total", "value", "data"]) {
    if (typeof value[key] === "number") return value[key];
    if (typeof value[key] === "string" && value[key] !== "") {
      const parsed = Number(value[key]);
      if (Number.isFinite(parsed)) return parsed;
    }
    if (value[key] && typeof value[key] === "object") {
      const nested = readCount(value[key]);
      if (nested !== null) return nested;
    }
  }

  return null;
}
