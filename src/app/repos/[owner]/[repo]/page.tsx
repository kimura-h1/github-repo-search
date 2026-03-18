import Link from "next/link";
import { fetchRepository } from "@/lib/github";

type Props = {
  params: Promise<{
    owner: string;
    repo: string;
  }>;
};

export default async function RepoDetailPage({ params }: Props) {
  const { owner, repo } = await params;
  const repoDetail = await fetchRepository(owner, repo);

  return (
    <main className="mx-auto max-w-2xl p-6">
      <Link href="/" className="text-sm underline">
        ← トップページへ戻る
      </Link>

      <div className="mt-6 rounded border p-5">
        <div className="flex items-center gap-4">
          <img
            src={repoDetail.owner.avatar_url}
            alt={`${repoDetail.owner.login} icon`}
            className="h-14 w-14 rounded-full"
          />
          <div>
            <h1 className="text-xl font-bold">{repoDetail.full_name}</h1>
            <p className="text-sm text-gray-600">
              Language: {repoDetail.language ?? "-"}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Stat label="Star" value={repoDetail.stargazers_count} />
          <Stat label="Watcher" value={repoDetail.subscribers_count} />
          <Stat label="Fork" value={repoDetail.forks_count} />
          <Stat label="Issue" value={repoDetail.open_issues_count} />
        </div>

        <a
          className="mt-6 inline-block text-sm underline"
          href={repoDetail.html_url}
          target="_blank"
          rel="noreferrer"
        >
          GitHubで開く
        </a>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded border p-3">
      <div className="text-sm text-gray-600">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}