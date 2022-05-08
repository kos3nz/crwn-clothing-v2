import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import {
  auth,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
} from 'utils/firebase/firebase.utils';

const SignIn = ({}: SignInProps) => {
  useEffect(() => {
    const getRedirectResultFromFirebase = async () => {
      const response = await getRedirectResult(auth);

      if (response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
      }
    };

    getRedirectResultFromFirebase();
  }, []);

  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();

    const userDocRef = await createUserDocumentFromAuth(response.user);

    console.log({ userDocRef });
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with google popup</button>
      <button onClick={signInWithGoogleRedirect}>
        Sign in with google redirect
      </button>
    </div>
  );
};

export default SignIn;

// Types
export type SignInProps = {};
