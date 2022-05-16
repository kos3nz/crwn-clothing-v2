import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Categories from 'routes/categories/categories.component';
import Category from 'routes/category/category.component';
import { getCategories } from 'store/categories/categories.slice';
import { useAppDispatch } from 'store/hooks';

const Shop = ({}: ShopProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
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
