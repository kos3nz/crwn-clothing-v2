import { Link, Outlet } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from 'assets/crown.svg';

import './navigation.styles.scss';
import { useUserContext } from 'context/user.context';
import { signOutUser } from 'utils/firebase/firebase.utils';

const Navigation = ({}: NavigationProps) => {
  const { currentUser, setCurrentUser } = useUserContext();

  const signOutHandler = async () => {
    await signOutUser();

    setCurrentUser(null);
  };

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to={'/'}>
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to={'/'}>
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutHandler}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to={'/auth'}>
              SIGN IN
            </Link>
          )}
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default Navigation;

// Types
export type NavigationProps = {};
