type Props = {
  language: string;
  sort: string;
  onLanguageChange: (value: string) => void;
  onSortChange: (value: string) => void;
};

export function FilterSortControls({
  language,
  sort,
  onLanguageChange,
  onSortChange,
}: Props) {
  return (
    <div className="mt-4 flex items-center gap-4">
      <select
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
      >
        <option value="">All</option>
        <option value="TypeScript">TypeScript</option>
        <option value="JavaScript">JavaScript</option>
        <option value="Python">Python</option>
        <option value="Go">Go</option>
      </select>

      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="">Best Match</option>
        <option value="stars">Stars</option>
        <option value="updated">Updated</option>
      </select>
    </div>
  );
}