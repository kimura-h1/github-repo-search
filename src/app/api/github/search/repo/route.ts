import { NextResponse } from "next/server";
import { RepoParamsSchema } from "@/lib/validators";
import { fetchRepository } from "@/lib/github";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const parsed = RepoParamsSchema.safeParse({
    owner: searchParams.get("owner") ?? "",
    repo: searchParams.get("repo") ?? "",
  });

  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid params" }, { status: 400 });
  }

  try {
    const data = await fetchRepository(parsed.data.owner, parsed.data.repo);
    return NextResponse.json(data);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ message: msg }, { status: 502 });
  }
}