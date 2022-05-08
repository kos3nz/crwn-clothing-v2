import Signup from 'components/form/sign-up/sign-up.component';
import Signin from 'components/form/sign-in/sign-in.component';

import './authentication.styles.scss';

const Auth = ({}: AuthProps) => {
  return (
    <div className="authentication-container">
      <Signin />
      <Signup />
    </div>
  );
};

export default Auth;

// Types
export type AuthProps = {};
