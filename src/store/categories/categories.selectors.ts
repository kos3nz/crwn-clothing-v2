import { createSelector } from 'reselect';
import { RootState } from 'store/store';
import categoriesSlice, { CategoryMap } from './categories.slice';

const selectCategoriesReducer = (state: RootState) => state.categories;

export const selectCategories = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    return categories.reduce<CategoryMap>((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);

export const selectCategoriesError = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => categoriesSlice.error
);
