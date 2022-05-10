import Button from 'components/button/button.component';
import CartItem from 'components/cart-item/cart-item.component';
import { useCartContext } from 'context/cart.context';

import './cart-dropdown.styles.scss';

const CartDropdown = ({}: CartDropdownProps) => {
  const { cartItems } = useCartContext();

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>

      <Button>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;

// Types
export type CartDropdownProps = {};
