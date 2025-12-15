import axios from 'axios';
import type { Book } from '../types/book.type';
import type { PaginatedResponse } from '../types/paginatedResponse.type';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5064/api';

export const bookService = {
  getBooks: async (pageIndex: number = 1, pageSize: number = 100): Promise<PaginatedResponse<Book>> => {
    const response = await axios.get<PaginatedResponse<Book>>(`${API_BASE_URL}/Libro`, {
      params: { pageIndex, pageSize }
    });
    return response.data;
  },

  getBookById: async (id: number): Promise<Book> => {
    const response = await axios.get<Book>(`${API_BASE_URL}/Libro/${id}`);
    return response.data;
  },

  createBook: async (book: Omit<Book, 'id' | 'createdAt'>): Promise<Book> => {
    const response = await axios.post<Book>(`${API_BASE_URL}/Libro`, book);
    return response.data;
  },
};
