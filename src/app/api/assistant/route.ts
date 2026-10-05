import { NextResponse } from "next/server";
import { answerPortfolioQuestion } from "@/data/assistant/knowledge";

// Local, approved-knowledge endpoint. A future model can be added server-side
// without sending environment variables or repository data to the browser.
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!body || typeof body !== "object")
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  const { question, pathname } = body as Record<string, unknown>;
  if (typeof question !== "string" || !question.trim() || question.length > 500)
    return NextResponse.json(
      { error: "Question must be 1–500 characters" },
      { status: 400 },
    );
  const safePath =
    typeof pathname === "string" &&
    pathname.startsWith("/") &&
    pathname.length < 200
      ? pathname
      : "";
  return NextResponse.json(answerPortfolioQuestion(question, safePath));
}
