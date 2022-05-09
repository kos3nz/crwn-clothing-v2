import ProductCard from 'components/product-card/product-card.component';
import { useProductsContext } from 'context/products.context';

import './shop.styles.scss';

const Shop = ({}: ShopProps) => {
  const { products } = useProductsContext();

  return (
    <div className="products-container">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Shop;

// Types
export type ShopProps = {};
