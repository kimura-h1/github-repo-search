"use client";

import Link from "next/link";
import type { RepoSearchItem } from "@/lib/github";

type Props = {
  items: RepoSearchItem[];
  query?: string;
  page?: number;
};

export function RepoList({ items, query = "", page = 1 }: Props) {
  return (
    <ul className="mt-6 grid gap-3">
      {items.map((r) => {
        const [owner, repo] = r.full_name.split("/");

        const params = new URLSearchParams();
        if (query) params.set("q", query);
        params.set("page", String(page));

        const href = `/repos/${owner}/${repo}?${params.toString()}`;

        return (
          <li key={r.id} className="rounded border p-4 hover:bg-gray-50">
            <Link href={href} className="flex gap-4">
              <img
                src={r.owner.avatar_url}
                alt={`${r.owner.login} icon`}
                className="h-10 w-10 rounded-full"
              />
              <div className="min-w-0">
                <div className="truncate font-semibold">{r.full_name}</div>
                <div className="line-clamp-2 text-sm text-gray-600">
                  {r.description ?? "No description"}
                </div>
                <div className="mt-1 text-sm">⭐ {r.stargazers_count}</div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}