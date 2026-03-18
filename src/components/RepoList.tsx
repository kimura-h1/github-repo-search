import Link from "next/link";
import type { RepoSearchItem } from "@/lib/github";

export function RepoList({ items }: { items: RepoSearchItem[] }) {
  return (
    <ul className="mt-6 grid gap-3">
      {items.map((r) => {
        const [owner, repo] = r.full_name.split("/");
        return (
          <li key={r.id} className="rounded border p-4 hover:bg-gray-50">
            <Link href={`/repos/${owner}/${repo}`} className="flex gap-4">
              <img
                src={r.owner.avatar_url}
                alt={`${r.owner.login} icon`}
                className="h-10 w-10 rounded-full"
              />
              <div className="min-w-0">
                <div className="font-semibold truncate">{r.full_name}</div>
                <div className="text-sm text-gray-600 line-clamp-2">
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