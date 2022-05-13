import CheckoutItem from 'components/checkout-item/checkout-item.component';
import { useAppSelector } from 'store/hooks';
import { selectCartItems, selectTotalPrice } from 'store/cart/cart.selectors';

import './checkout.styles.scss';

const Checkout = ({}: CheckoutProps) => {
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>

      {cartItems.map((cartItem) => {
        return <CheckoutItem key={cartItem.id} cartItem={cartItem} />;
      })}

      <span className="total">Total: ${totalPrice}</span>
    </div>
  );
};

export default Checkout;

/* Types */
export type CheckoutProps = {};
