import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from 'utils/firebase/firebase.utils';

const SignIn = ({}: SignInProps) => {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();

    const userDocRef = await createUserDocumentFromAuth(response.user);

    console.log({ userDocRef });
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with google popup</button>
    </div>
  );
};

export default SignIn;

// Types
export type SignInProps = {};
