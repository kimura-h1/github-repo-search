"use client";

import { useState } from "react";

type Props = {
  onSearch: (q: string) => void;
  isLoading: boolean;
};

export function SearchForm({ onSearch, isLoading }: Props) {
  const [q, setQ] = useState("");

  return (
    <form
      className="flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(q);
      }}
    >
      <input
        className="w-full rounded border px-3 py-2"
        placeholder="リポジトリ名を入力してください"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="search-input"
      />
      <button
        className="rounded border px-4 py-2 disabled:opacity-50"
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? "検索中..." : "検索"}
      </button>
    </form>
  );
}