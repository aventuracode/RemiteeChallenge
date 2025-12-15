import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { BooksState } from '../../types/booksState.type';
import { bookService } from '../../services/bookService.service';
import type { Book } from '../../types/book.type';


const initialState: BooksState = {
  books: [],
  loading: false,
  error: null,
  pagination: null,
};

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await bookService.getBooks();
      return response;
    } catch (error: unknown) {
      const message = error instanceof Error && 'response' in error 
        ? (error as any).response?.data?.message || 'Error al cargar los libros'
        : 'Error al cargar los libros';
      return rejectWithValue(message);
    }
  }
);

export const createBook = createAsyncThunk(
  'books/createBook',
  async (book: Omit<Book, 'id' | 'createdAt'>, { rejectWithValue }) => {
    try {
      const newBook = await bookService.createBook(book);
      return newBook;
    } catch (error: unknown) {
      const message = error instanceof Error && 'response' in error 
        ? (error as any).response?.data?.message || 'Error al crear el libro'
        : 'Error al crear el libro';
      return rejectWithValue(message);
    }
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload.data;
        state.pagination = {
          count: action.payload.count,
          pageIndex: action.payload.pageIndex,
          pageSize: action.payload.pageSize,
          pageCount: action.payload.pageCount,
        };
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBook.fulfilled, (state, action: PayloadAction<Book>) => {
        state.loading = false;
        state.books.push(action.payload);
      })
      .addCase(createBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = booksSlice.actions;
export default booksSlice.reducer;
