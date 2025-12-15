import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { bookService } from "../../shared/services/bookService.service";
import type { Book } from "../../shared/types/book.type";
import BookDetailSkeleton from "./components/BookDetailSkeleton";
import BookDetailError from "./components/BookDetailError";
import BookDetailCard from "./components/BookDetailCard";

export const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBook = async () => {
      if (!id) {
        navigate("/");
        return;
      }

      const bookId = parseInt(id, 10);
      try {
        const bookData = await bookService.getBookById(bookId);
        setBook(bookData);
      } catch {
        setError("No se pudo cargar el libro");
      } finally {
        setLoading(false);
      }
    };

    loadBook();
  }, [id, navigate]);

  if (loading) {
    return <BookDetailSkeleton />;
  }

  if (error || !book) {
    return <BookDetailError error={error} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver al listado
        </button>

        <BookDetailCard book={book} />
      </div>
    </div>
  );
};
