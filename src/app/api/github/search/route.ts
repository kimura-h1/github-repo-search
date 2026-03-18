import { NextResponse } from "next/server";
import { SearchQuerySchema } from "@/lib/validators";
import { searchRepositories } from "@/lib/github";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const q = searchParams.get("q") ?? "";
  const page = Number(searchParams.get("page") ?? "1");
  const perPage = Number(searchParams.get("per_page") ?? "10");

  const parsed = SearchQuerySchema.safeParse({ q });

  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? "Invalid query" },
      { status: 400 },
    );
  }

  if (!Number.isInteger(page) || page < 1) {
    return NextResponse.json(
      { message: "page must be an integer greater than or equal to 1" },
      { status: 400 },
    );
  }

  if (!Number.isInteger(perPage) || perPage < 1 || perPage > 100) {
    return NextResponse.json(
      { message: "per_page must be an integer between 1 and 100" },
      { status: 400 },
    );
  }

  try {
    const data = await searchRepositories(parsed.data.q, page, perPage);
    return NextResponse.json(data);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ message: msg }, { status: 502 });
  }
}