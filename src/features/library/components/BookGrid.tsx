import React from "react";
import BookCard from "./BookCard";
import { VARIANTS } from "./theme";

type Book = {
  id: string | number;
  title: string;
  author: string;
  description: string;
  color?: typeof VARIANTS[number]; // optional, nếu có thì ưu tiên
};

type Props = { books: Book[]; onView?: (book: Book) => void };

// gán màu không lặp trong phạm vi danh sách hiện tại
function assignUniqueVariants(books: Book[]) {
  const map = new Map<string | number, typeof VARIANTS[number]>();
  for (let i = 0; i < books.length; i++) {
    const b = books[i];
    const v = b.color ?? VARIANTS[i]; // đủ 12 màu cho 12 mục đầu, không lặp
    map.set(b.id, v ?? VARIANTS[i % VARIANTS.length]); // phòng trường hợp >12
  }
  return map;
}

export default function BookGrid({ books, onView }: Props) {
  const assigned = assignUniqueVariants(books);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {books.map((b) => {
        const variant = assigned.get(b.id)!;
        return (
          <BookCard
            key={b.id}
            id={b.id}
            title={b.title}
            author={b.author}
            description={b.description}
            variant={variant}
            onView={() => onView?.({ ...b, color: variant })} // truyền màu ra ngoài
          />
        );
      })}
    </div>
  );
}
