export type RepoSearchItem = {
  id: number;
  full_name: string; // owner/repo
  html_url: string;
  description: string | null;
  stargazers_count: number;
  owner: { login: string; avatar_url: string };
};

export type RepoSearchResponse = {
  per_page: number;
  total_count: number;
  items: RepoSearchItem[];
};

export type RepoDetail = {
  name: string;
  full_name: string;
  html_url: string;
  language: string | null;
  stargazers_count: number; // stars
  subscribers_count: number; // watchers (actual subscribers)
  forks_count: number;
  open_issues_count: number;
  owner: { login: string; avatar_url: string };
};

const GITHUB_API = "https://api.github.com";

function buildHeaders() {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

export async function searchRepositories(
  q: string,
  page: number,
  perPage: number
): Promise<RepoSearchResponse> {
  const url = new URL(`${GITHUB_API}/search/repositories`);
  url.searchParams.set("q", q);
  url.searchParams.set("page", String(page));
  url.searchParams.set("per_page", String(perPage));

  const res = await fetch(url.toString(), {
    headers: buildHeaders(),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`GitHub search failed: ${res.status} ${text}`);
  }

  const data = await res.json();

  return {
    total_count: data.total_count,
    items: data.items,
    per_page: perPage,
  };
}

export async function fetchRepository(owner: string, repo: string): Promise<RepoDetail> {
  const res = await fetch(`${GITHUB_API}/repos/${owner}/${repo}`, {
    headers: buildHeaders(),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`GitHub repo fetch failed: ${res.status} ${text}`);
  }
  return res.json();
}