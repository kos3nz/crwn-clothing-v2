import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Categories from 'routes/categories/categories.component';
import Category from 'routes/category/category.component';
import { fetchCategoriesAsync } from 'store/categories/categories.slice';
import { useAppDispatch } from 'store/hooks';

const Shop = ({}: ShopProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
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
