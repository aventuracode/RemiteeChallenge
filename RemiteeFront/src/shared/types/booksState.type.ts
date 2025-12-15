import type { Book } from "./book.type";

export interface BooksState {
  books: Book[];
  loading: boolean;
  error: string | null;
  pagination: {
    count: number;
    pageIndex: number;
    pageSize: number;
    pageCount: number;
  } | null;
}