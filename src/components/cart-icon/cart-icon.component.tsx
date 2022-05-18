import { ReactComponent as ShoppingIcon } from 'assets/shopping-bag.svg';
import { selectCartCount } from 'store/cart/cart.selectors';
import { toggleCartDropdown } from 'store/cart/cart.slice';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import './cart-icon.styles.scss';

const CartIcon = () => {
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector(selectCartCount);

  const handleToggleDropdown = () => {
    dispatch(toggleCartDropdown());
  };

  return (
    <button className="cart-icon-container" onClick={handleToggleDropdown}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </button>
  );
};

export default CartIcon;
