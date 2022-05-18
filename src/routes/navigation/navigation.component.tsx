import { Link, Outlet } from 'react-router-dom';

import { ReactComponent as CrwnLogo } from 'assets/crown.svg';
import CartIcon from 'components/cart-icon/cart-icon.component';
import CartDropdown from 'components/cart-dropdown/cart-dropdown.component';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/user/user.selectors';
import { selectIsCartOpen } from 'store/cart/cart.selectors';

import './navigation.styles.scss';
import { signOut } from 'store/user/user.slice';

const Navigation = ({}: NavigationProps) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const isCartOpen = useAppSelector(selectIsCartOpen);

  const onSignOutHandler = () => {
    dispatch(signOut());
  };

  const userStatus = currentUser ? (
    <span className="nav-link" onClick={onSignOutHandler}>
      SIGN OUT
    </span>
  ) : (
    <Link className="nav-link" to={'/auth'}>
      SIGN IN
    </Link>
  );

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to={'/'}>
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to={'/shop'}>
            SHOP
          </Link>
          {currentUser !== undefined && userStatus}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>

      <Outlet />
    </>
  );
};

export default Navigation;

// Types
export type NavigationProps = {};
