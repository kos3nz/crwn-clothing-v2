import { Link, Outlet } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from 'assets/crown.svg';

import CartIcon from 'components/cart-icon/cart-icon.component';
import CartDropdown from 'components/cart-dropdown/cart-dropdown.component';
import { useUserContext } from 'context/user.context';
import { useCartContext } from 'context/cart.context';
import { signOutUser } from 'utils/firebase/firebase.utils';

import './navigation.styles.scss';

const Navigation = ({}: NavigationProps) => {
  const { currentUser } = useUserContext();
  const { isCartOpen } = useCartContext();

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
