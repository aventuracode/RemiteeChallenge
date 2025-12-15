import { useEffect, useState } from "react";
import { BookCard } from "./components/BookCard";
import { BookForm } from "./components/BookForm";
import BookSkeleton from "./components/BookSkeleton";
import BookError from "./components/BookError";
import BookEmpty from "./components/BookEmpty";
import { useAppDispatch, useAppSelector } from "../../shared/store/hooks";
import { fetchBooks } from "../../shared/store/slices/booksSlice";

export const Home = () => {
  const dispatch = useAppDispatch();
  const { books, loading, error, pagination } = useAppSelector(
    (state) => state.books
  );
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchBooks({ pageIndex: currentPage, pageSize: 10 }));
  }, [dispatch, currentPage]);

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
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {books.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>

                {pagination && pagination.pageCount > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-8">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(1, prev - 1))
                      }
                      disabled={currentPage === 1}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                      Anterior
                    </button>
                    <span className="text-gray-700 font-medium">
                      Página {pagination.pageIndex} de {pagination.pageCount}
                    </span>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) =>
                          Math.min(pagination.pageCount, prev + 1)
                        )
                      }
                      disabled={currentPage >= pagination.pageCount}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                      Siguiente
                    </button>
                  </div>
                )}
              </>
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
