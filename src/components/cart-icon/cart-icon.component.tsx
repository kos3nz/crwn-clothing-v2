import { ReactComponent as ShoppingIcon } from 'assets/shopping-bag.svg';
import { useCartContext } from 'context/cart.context';

import './cart-icon.styles.scss';

// Types
export type CartIconProps = {};

const CartIcon = ({}: CartIconProps) => {
  const { toggleDropdown } = useCartContext();

  return (
    <button className="cart-icon-container" onClick={toggleDropdown}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </button>
  );
};

export default CartIcon;
