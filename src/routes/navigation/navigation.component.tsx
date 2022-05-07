import { Link, Outlet } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from 'assets/crown.svg';

import './navigation.styles.scss';

const Navigation = ({}: NavigationProps) => {
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
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default Navigation;

// Types
export type NavigationProps = {};
