import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from 'utils/firebase/firebase.utils';
import Signup from 'components/form/sign-up/sign-up.component';

const Auth = ({}: AuthProps) => {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();

    const userDocRef = await createUserDocumentFromAuth(response.user);

    console.log({ userDocRef });
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with google popup</button>

      <Signup />
    </div>
  );
};

export default Auth;

// Types
export type AuthProps = {};
