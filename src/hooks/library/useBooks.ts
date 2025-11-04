import { useMemo, useState } from "react";
import type { Book } from "src/types/library"; 

export function useBooks(initialBooks: Book[]) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return initialBooks;

    return initialBooks.filter((b) => {
      const title = b.title?.toLowerCase() ?? "";
      const author = b.author?.toLowerCase() ?? "";
      const desc = b.description?.toLowerCase() ?? "";
      return title.includes(q) || author.includes(q) || desc.includes(q);
    });
  }, [initialBooks, query]);

  const reset = () => setQuery("");

  return {
    query,
    setQuery,
    filtered,
    count: filtered.length,
    total: initialBooks.length,
    reset,
  };
}

export default useBooks;
