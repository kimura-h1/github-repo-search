type PaginationProps = {
  page: number;
  totalPages: number;
  isLoading?: boolean;
  onPrev: () => void;
  onNext: () => void;
};

export function Pagination({
  page,
  totalPages,
  isLoading = false,
  onPrev,
  onNext,
}: PaginationProps) {
  return (
    <div className="mt-6 flex items-center justify-center gap-3">
      <button
        type="button"
        onClick={onPrev}
        disabled={isLoading || page <= 1}
        className="rounded border px-3 py-1 disabled:opacity-50"
      >
        前へ
      </button>

      <span className="text-sm text-gray-600">
        {page} / {Math.max(totalPages, 1)} ページ
      </span>

      <button
        type="button"
        onClick={onNext}
        disabled={isLoading || page >= totalPages}
        className="rounded border px-3 py-1 disabled:opacity-50"
      >
        次へ
      </button>
    </div>
  );
}