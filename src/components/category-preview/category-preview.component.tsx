import { Link } from 'react-router-dom';

import ProductCard from 'components/product-card/product-card.component';
import { Product } from 'store/categories/categories.slice';

import './category-preview.styles.scss';

const CategoryPreview = ({ title, products }: CategoryPreviewProps) => {
  return (
    <div className="category-preview-container">
      <h2>
        <Link className="title" to={title}>
          {title.toUpperCase()}{' '}
        </Link>
      </h2>
      <div className="preview">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPreview;

/* Types */
export type CategoryPreviewProps = {
  title: string;
  products: Product[];
};
