import { SearchForm } from "@/components/SearchForm";
import Link from "next/link";

type Props = {
  title?: string;
  onSearch?: (q: string) => void;
  isLoading?: boolean;
  initialQuery?: string;
};

export function SearchSection({
  title = "GitHub Repository Search",
  onSearch,
  isLoading = false,
  initialQuery = "",
}: Props) {
  return (
    <>
      <h1 className="text-2xl font-bold">
            <Link href="/" >
                {title}
            </Link>
            </h1>

      {onSearch && (
        <div className="mt-4">
          <SearchForm
            onSearch={onSearch}
            isLoading={isLoading}
            initialQuery={initialQuery}
          />
        </div>
      )}
    </>
  );
}