import SearchInput from "./components/SearchInput";
import BookGrid from "./components/BookGrid";
import { BOOKS } from "./mock-data/books";
import { useBooks } from "src/hooks/library/useBooks";      // <-- hook dùng chung
import type { Book } from "src/types/library";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "src/layouts";

export const LibraryPage = () => {
  const { query, setQuery, filtered } = useBooks(BOOKS);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleView = (book: any) => {
    navigate(`/library/${book.id}`, { state: { color: book.color } });
  }

  return (
    <MainLayout>
      <div className="mx-auto max-w-[1200px] px-6 py-6">
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-gray-900">Library</h1>
        </div>

        <SearchInput
          value={query}
          onChange={handleChange}
          aria-label="Search books"
        />

        <BookGrid books={filtered} onView={handleView} />
      </div>
    </MainLayout>
  );
};
