import type { CartItemType } from 'store/cart/cart.slice';

import './cart-item.styles.scss';

const CartItem = ({
  cartItem: { name, quantity, price, imageUrl },
}: CartItemProps) => {
  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={name} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x ${price}
        </span>
      </div>
    </div>
  );
};

export default CartItem;

// Types
export type CartItemProps = { cartItem: CartItemType };
