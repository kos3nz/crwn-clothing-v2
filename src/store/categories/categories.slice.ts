import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* State */
const INITIAL_STATE: CategoriesState = {
  categories: [],
};

/* Slice */
const CategoriesSlice = createSlice({
  name: 'categories',
  initialState: INITIAL_STATE,
  reducers: {
    setCategories: (state, action: PayloadAction<CategoryArray>) => {
      state.categories = action.payload;
    },
  },
});

export const { setCategories } = CategoriesSlice.actions;

export default CategoriesSlice.reducer;

/* Types */

export type CategoriesState = {
  categories: CategoryArray;
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
