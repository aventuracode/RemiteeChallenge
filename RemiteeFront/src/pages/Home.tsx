import { useEffect } from "react";
import { BookCard } from "./Home/components/BookCard";
import { BookForm } from "./Home/components/BookForm";
import BookSkeleton from "./Home/components/BookSkeleton";
import BookError from "./Home/components/BookError";
import BookEmpty from "./Home/components/BookEmpty";
import { useAppDispatch, useAppSelector } from "../shared/store/hooks";
import { fetchBooks } from "../shared/store/slices/booksSlice";

export const Home = () => {
  const dispatch = useAppDispatch();
  const { books, loading, error } = useAppSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Libros
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Listado de Libros
            </h2>

            {loading && <BookSkeleton />}

            {error && !loading && <BookError error={error} />}

            {!loading && !error && books.length === 0 && <BookEmpty />}

            {!loading && books.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {books.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <BookForm />
          </div>
        </div>
      </div>
    </div>
  );
};
