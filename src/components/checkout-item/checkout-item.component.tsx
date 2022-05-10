import { CartItemType, useCartContext } from 'context/cart.context';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }: CheckoutItemProps) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const { addItemToCart, removeItemFromCart, clearItemFromCart } =
    useCartContext();

  const addItemHandler = () => addItemToCart(cartItem);

  const removeItemHandler = () => removeItemFromCart(cartItem);

  const clearItemHandler = () => clearItemFromCart(cartItem);

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
