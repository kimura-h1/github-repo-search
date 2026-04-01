"use client";

import { useEffect, useState } from "react";
import { SearchForm } from "@/components/SearchForm";
import { RepoList } from "@/components/RepoList";
import { Pagination } from "@/components/Pagination";
import type { RepoSearchResponse } from "@/lib/github";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchSection } from "@/components/SearchSection";

export default function HomePage() {
  const [data, setData] = useState<RepoSearchResponse | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const perPage = 10;

  const query = searchParams.get("q") ?? "";
  const page = Number(searchParams.get("page") ?? "1");

  async function searchRepositories(q: string, nextPage = 1) {
    setError("");

    const trimmed = q.trim();
    if (!trimmed) {
      setError("キーワードを入力してください");
      setData(null);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `/api/github/search?q=${encodeURIComponent(trimmed)}&page=${nextPage}&per_page=${perPage}`
      );
      const body = await res.json();

      if (!res.ok) {
        throw new Error(body?.message ?? "Search failed");
      }

      setData(body);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!query) {
      setData(null);
      setError("");
      return;
    }

    searchRepositories(query, page);
  }, [query, page]);

  function handleSearch(q: string) {
    const trimmed = q.trim();
    if (!trimmed) {
      setError("キーワードを入力してください");
      return;
    }

    router.push(`/?q=${encodeURIComponent(trimmed)}&page=1`);
  }

  function handlePrevPage() {
    if (page <= 1) return;
    router.push(`/?q=${encodeURIComponent(query)}&page=${page - 1}`);
  }

  function handleNextPage() {
    const totalPages = data
      ? Math.ceil(Math.min(data.total_count, 1000) / perPage)
      : 0;

    if (page >= totalPages) return;
    router.push(`/?q=${encodeURIComponent(query)}&page=${page + 1}`);
  }

  const totalPages = data
    ? Math.ceil(Math.min(data.total_count, 1000) / perPage)
    : 0;

  return (
    <main className="mx-auto max-w-2xl p-6">
        <SearchSection
          onSearch={handleSearch}
          isLoading={loading}
          initialQuery={query}
        />

      {error && (
        <p className="mt-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {data && data.items.length === 0 && (
        <p className="mt-6 text-sm text-gray-600">検索結果がありませんでした。</p>
      )}

      {data && data.items.length > 0 && (
        <>
          <div className="mt-4 text-sm text-gray-600">
            総件数: {data.total_count}
          </div>

          <RepoList items={data.items} query={query} page={page} />

          <Pagination
            page={page}
            totalPages={totalPages}
            isLoading={loading}
            onPrev={handlePrevPage}
            onNext={handleNextPage}
          />
        </>
      )}
    </main>
  );
}