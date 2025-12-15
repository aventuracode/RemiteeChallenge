import React from "react";
import type { Book } from "../../../shared/types/book.type";
interface IBookDetailCard {
  book: Book;
}
const BookDetailCard = ({ book }: IBookDetailCard) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto border border-gray-200">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{book.titulo}</h1>

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
  );
};

export default BookDetailCard;
