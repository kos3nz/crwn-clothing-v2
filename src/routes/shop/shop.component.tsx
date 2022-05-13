import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Categories from 'routes/categories/categories.component';
import Category from 'routes/category/category.component';
import {
  CategoryArray,
  setCategories,
} from 'store/categories/categories.slice';
import { useAppDispatch } from 'store/hooks';
import { getCategoriesAndDocuments } from 'utils/firebase/firebase.utils';

const Shop = ({}: ShopProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getCategories = async () => {
      const categories = await getCategoriesAndDocuments();

      dispatch(setCategories(categories as CategoryArray));
    };

    getCategories();
  }, []);

  return (
    <Routes>
      <Route index element={<Categories />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;

// Types
export type ShopProps = {};
