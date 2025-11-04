import type { Book } from "src/types/library";

export function getBookById(list: Book[], id?: string) {
  if (!id) return undefined;
  return list.find((b) => String(b.id) === String(id));
}
