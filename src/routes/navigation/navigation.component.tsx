import { Link, Outlet } from 'react-router-dom';

import { ReactComponent as CrwnLogo } from 'assets/crown.svg';
import CartIcon from 'components/cart-icon/cart-icon.component';
import CartDropdown from 'components/cart-dropdown/cart-dropdown.component';
import { signOutUser } from 'utils/firebase/firebase.utils';
import { useAppSelector } from 'store/hooks';
import { selectCurrentUser } from 'store/user/user.selectors';
import { selectIsCartOpen } from 'store/cart/cart.selectors';

import './navigation.styles.scss';

const Navigation = ({}: NavigationProps) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const isCartOpen = useAppSelector(selectIsCartOpen);

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
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to={'/auth'}>
              SIGN IN
            </Link>
          )}
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
