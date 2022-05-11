import { Routes, Route } from 'react-router-dom';

import Categories from 'routes/categories/categories.component';
import Category from 'routes/category/category.component';

const Shop = ({}: ShopProps) => {
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
