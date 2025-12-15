import { useNavigate } from "react-router-dom";
import type { Book } from "../../../shared/types/book.type";

interface BookCardProps {
  book: Book;
}

export const BookCard = ({ book }: BookCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/libro/${book.id}`)}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow cursor-pointer border border-gray-200"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-gray-800">{book.titulo}</h3>
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
          {book.categoriaNombre}
        </span>
      </div>
      <p className="text-gray-600 mb-3">
        <span className="font-semibold">Autor:</span> {book.autor}
      </p>
      <p className="text-gray-700 line-clamp-3">{book.descripcion}</p>
    </div>
  );
};
