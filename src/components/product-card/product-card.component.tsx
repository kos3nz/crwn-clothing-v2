import Button from 'components/button/button.component';
import { useCartContext } from 'context/cart.context';
import type { Product } from 'context/categories.context';

import './product-card.styles.scss';

const ProductCard = ({ product }: ProductCardProps) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useCartContext();

  const addProductToCart = () => addItemToCart(product);

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={addProductToCart}>
        Add to cart
      </Button>
    </div>
  );
};

export default ProductCard;

// Types
export type ProductCardProps = {
  product: Product;
};
