"use client";

import { useState } from "react";
import { SearchForm } from "@/components/SearchForm";
import { RepoList } from "@/components/RepoList";
import { Pagination } from "@/components/Pagination";
import type { RepoSearchResponse } from "@/lib/github";

export default function HomePage() {
  const [data, setData] = useState<RepoSearchResponse | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [currentQuery, setCurrentQuery] = useState("");

  const perPage = 10;

  async function searchRepositories(q: string, nextPage = 1) {
    setError("");

    const trimmed = q.trim();
    if (!trimmed) {
      setError("キーワードを入力してください");
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
      setPage(nextPage);
      setCurrentQuery(trimmed);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(q: string) {
    await searchRepositories(q, 1);
  }

  async function handlePrevPage() {
    if (page <= 1) return;
    await searchRepositories(currentQuery, page - 1);
  }

  async function handleNextPage() {
  const totalPages = data
    ? Math.ceil(Math.min(data.total_count, 1000) / perPage)
    : 0;

  if (page >= totalPages) return;
  await searchRepositories(currentQuery, page + 1);
}
  const totalPages = data
  ? Math.ceil(Math.min(data.total_count, 1000) / perPage)
  : 0;
  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-bold">GitHub Repository Search</h1>

      <div className="mt-4">
        <SearchForm onSearch={handleSearch} isLoading={loading} />
      </div>

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

          <RepoList items={data.items} />

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