import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Categories from 'routes/categories/categories.component';
import Category from 'routes/category/category.component';
import { getCategoriesFetch } from 'store/categories/categories.slice';
import { useAppDispatch } from 'store/hooks';

const Shop = ({}: ShopProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategoriesFetch());
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
