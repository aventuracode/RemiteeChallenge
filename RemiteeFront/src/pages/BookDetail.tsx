import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { bookService } from "../shared/services/bookService";
import type { Book } from "../shared/types/book";

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
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded max-w-md">
          <p className="font-bold mb-2">Error</p>
          <p>{error || "Libro no encontrado"}</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
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

        <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto border border-gray-200">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {book.titulo}
          </h1>

          <div className="mb-6 space-y-2">
            <p className="text-gray-600 text-lg">
              <span className="font-semibold">Autor:</span> {book.autor}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Categoría:</span>{" "}
              {book.categoriaNombre}
            </p>
            <p className="text-gray-500 text-sm">
              <span className="font-semibold">Fecha de creación:</span>{" "}
              {new Date(book.createdAt).toLocaleDateString("es-ES")}
            </p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Descripción
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {book.descripcion}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              <span className="font-semibold">ID:</span> {book.id}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
