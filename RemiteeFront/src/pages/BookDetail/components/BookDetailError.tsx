import { useNavigate } from "react-router-dom";

interface IBookDetailError {
  error: string | null;
}
const BookDetailError = ({ error }: IBookDetailError) => {
  const navigate = useNavigate();
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
};

export default BookDetailError;
