import { useNavigate } from 'react-router-dom';

import Button from 'components/button/button.component';
import CartItem from 'components/cart-item/cart-item.component';
import { useAppSelector } from 'store/hooks';
import { selectCartItems } from 'store/cart/cart.selectors';

import './cart-dropdown.styles.scss';

const CartDropdown = ({}: CartDropdownProps) => {
  const navigate = useNavigate();

  const cartItems = useAppSelector(selectCartItems);

  const goToCheckoutHandler = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>

      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;

// Types
export type CartDropdownProps = {};
