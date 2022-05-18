import { useAppDispatch } from 'store/hooks';
import {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart,
  type CartItemType,
} from 'store/cart/cart.slice';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }: CheckoutItemProps) => {
  const dispatch = useAppDispatch();
  const { name, imageUrl, price, quantity } = cartItem;

  const addItemHandler = () => dispatch(addItemToCart(cartItem));

  const removeItemHandler = () => dispatch(removeItemFromCart(cartItem));

  const clearItemHandler = () => dispatch(clearItemFromCart(cartItem));

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>

      <span className="name">{name}</span>
      <span className="quantity">
        <span className="arrow" onClick={removeItemHandler}>
          &#10094;
        </span>
        <span className="value">{quantity}</span>
        <span className="arrow" onClick={addItemHandler}>
          &#10095;
        </span>
      </span>
      <span className="price">{price}</span>
      <span className="remove-button" onClick={clearItemHandler}>
        &#10005;
      </span>
    </div>
  );
};

export default CheckoutItem;

/* Types */
export type CheckoutItemProps = { cartItem: CartItemType };
