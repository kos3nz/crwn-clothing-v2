import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './category.styles.scss';
import ProductCard from 'components/product-card/product-card.component';
import { useAppSelector } from 'store/hooks';
import { selectCategoriesMap } from 'store/categories/categories.selectors';
import { Product } from 'store/categories/categories.slice';

const Category = ({}: CategoryProps) => {
  const { category } = useParams() as CategoryRouteParams;
  const categoriesMap = useAppSelector(selectCategoriesMap);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <div className="category-container">
      <h2 className="title">{category}</h2>
      <div className="items">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Category;

/* Types */
export type CategoryProps = {};

export type CategoryRouteParams = {
  category: string;
};
