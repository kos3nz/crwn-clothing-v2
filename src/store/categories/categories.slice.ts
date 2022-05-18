import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FirebaseError } from 'firebase/app';
import { getDocuments } from 'utils/firebase/firebase.utils';

/* State */
const INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: undefined,
};

/* Action Types */
export const CATEGORIES_ACTION_TYPES = {
  GET_CATEGORIES: 'categories/getCategories',
} as const;

/* Async Thunk Functions */
export const fetchCategoriesAsync = createAsyncThunk<
  CategoryArray,
  undefined,
  { rejectValue: FirebaseError | Error }
>('categories/fetchCategoriesAsync', async (_, { rejectWithValue }) => {
  try {
    const categories = await getDocuments('categories');

    return categories as CategoryArray;
  } catch (error) {
    return rejectWithValue(error as FirebaseError | Error);
  }
});

/* Slice */
const CategoriesSlice = createSlice({
  name: 'categories',
  initialState: INITIAL_STATE,
  // Saga Code
  reducers: {
    getCategories: (state) => {
      state.isLoading = true;
    },
    getCategoriesSuccess: (state, action: PayloadAction<CategoryArray>) => {
      state.categories = action.payload;
      state.isLoading = false;
      state.error = undefined;
    },
    getCategoriesFailure: (
      state,
      action: PayloadAction<FirebaseError | Error>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
  // Thunk Code
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesAsync.pending, (state) => {
        if (!state.isLoading) {
          state.isLoading = true;
        }
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        if (state.isLoading) {
          state.isLoading = false;
          state.error = undefined;
          state.categories = action.payload;
        }
      })
      .addCase(fetchCategoriesAsync.rejected, (state, action) => {
        if (state.isLoading) {
          state.isLoading = false;
          state.error = action.payload;
        }
      });
  },
});

export const { getCategories, getCategoriesSuccess, getCategoriesFailure } =
  CategoriesSlice.actions;

export default CategoriesSlice.reducer;

/* Types */

export type CategoriesState = {
  categories: CategoryArray;
  isLoading: boolean;
  error: Error | FirebaseError | undefined;
};

export type CategoryArray = Category[];

export type Category = {
  title: string;
  items: Product[];
};

export type Product = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
};

export type CategoryMap = {
  [title: string]: Product[];
};
