import { createSelector } from 'reselect';
import { RootState } from 'store/store';
import { CategoryMap } from './categories.slice';

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
