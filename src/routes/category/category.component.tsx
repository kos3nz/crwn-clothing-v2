import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProductCard from 'components/product-card/product-card.component';
import Spinner from 'components/spinner/spinner.component';

import { useAppSelector } from 'store/hooks';
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from 'store/categories/categories.selectors';
import type { Product } from 'store/categories/categories.slice';

import './category.styles.scss';

const Category = ({}: CategoryProps) => {
  const { category } = useParams() as CategoryRouteParams;
  const categoriesMap = useAppSelector(selectCategoriesMap);
  const isLoading = useAppSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <div className="category-container">
      <h2 className="title">{category}</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="items">
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Category;

/* Types */
export type CategoryProps = {};

export type CategoryRouteParams = {
  category: string;
};
