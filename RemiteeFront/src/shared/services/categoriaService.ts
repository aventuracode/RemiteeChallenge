import axios from 'axios';
import type { Categoria } from '../types/categoria.type';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5064/api';

export const categoriaService = {
  getCategorias: async (): Promise<Categoria[]> => {
    const response = await axios.get<Categoria[]>(`${API_BASE_URL}/Categoria`);
    return response.data;
  },
};
