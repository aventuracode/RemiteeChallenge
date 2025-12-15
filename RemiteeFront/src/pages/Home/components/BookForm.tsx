import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/store/hooks";
import {
  clearError,
  createBook,
  fetchBooks,
} from "../../../shared/store/slices/booksSlice";
import { categoriaService } from "../../../shared/services/categoriaService";
import type { Categoria } from "../../../shared/types/categoria.type";

export const BookForm = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.books);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loadingCategorias, setLoadingCategorias] = useState(true);

  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    descripcion: "",
    categoriaId: 1,
    categoriaNombre: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    titulo: "",
    autor: "",
    descripcion: "",
    categoriaId: "",
  });

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await categoriaService.getCategorias();
        setCategorias(data);
        if (data.length > 0) {
          setFormData((prev) => ({ ...prev, categoriaId: data[0].id }));
        }
      } catch (err) {
        console.error("Error al cargar categorías:", err);
      } finally {
        setLoadingCategorias(false);
      }
    };
    fetchCategorias();
  }, []);

  const validateForm = () => {
    const errors = {
      titulo: "",
      autor: "",
      descripcion: "",
      categoriaId: "",
    };
    let isValid = true;

    if (!formData.titulo.trim()) {
      errors.titulo = "El título es obligatorio";
      isValid = false;
    }

    if (!formData.autor.trim()) {
      errors.autor = "El autor es obligatorio";
      isValid = false;
    }

    if (!formData.descripcion.trim()) {
      errors.descripcion = "La descripción es obligatoria";
      isValid = false;
    }

    if (!formData.categoriaId) {
      errors.categoriaId = "Debe seleccionar una categoría";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await dispatch(createBook(formData)).unwrap();
      setFormData({
        titulo: "",
        autor: "",
        descripcion: "",
        categoriaId: categorias.length > 0 ? categorias[0].id : 1,
        categoriaNombre: "",
      });
      setValidationErrors({
        titulo: "",
        autor: "",
        descripcion: "",
        categoriaId: "",
      });
      dispatch(fetchBooks({ pageIndex: 1, pageSize: 10 }));
    } catch (err) {
      console.error("Error al crear libro:", err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const finalValue = name === "categoriaId" ? Number(value) : value;
    setFormData((prev) => ({ ...prev, [name]: finalValue }));
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (error) {
      dispatch(clearError());
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Agregar Nuevo Libro
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="titulo"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Título
          </label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              validationErrors.titulo ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Ingrese el título del libro"
          />
          {validationErrors.titulo && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.titulo}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="autor"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Autor
          </label>
          <input
            type="text"
            id="autor"
            name="autor"
            value={formData.autor}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              validationErrors.autor ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Ingrese el nombre del autor"
          />
          {validationErrors.autor && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.autor}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="descripcion"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Descripción
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows={4}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              validationErrors.descripcion
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="Ingrese la descripción del libro"
          />
          {validationErrors.descripcion && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.descripcion}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="categoriaId"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Categoría
          </label>
          <select
            id="categoriaId"
            name="categoriaId"
            value={formData.categoriaId}
            onChange={handleChange}
            disabled={loadingCategorias}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              validationErrors.categoriaId
                ? "border-red-500"
                : "border-gray-300"
            }`}
          >
            {loadingCategorias ? (
              <option>Cargando categorías...</option>
            ) : (
              categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </option>
              ))
            )}
          </select>
          {validationErrors.categoriaId && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.categoriaId}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {loading ? "Guardando..." : "Agregar Libro"}
        </button>
      </form>
    </div>
  );
};
