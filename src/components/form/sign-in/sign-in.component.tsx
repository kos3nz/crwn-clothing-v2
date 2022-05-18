import { useState } from 'react';
import { FirebaseError } from 'firebase/app';

import FormInput from 'components/form/input/input.component';
import Button from 'components/button/button.component';
import './sign-in.styles.scss';

import { useAppDispatch } from 'store/hooks';
import { emailSignIn, googleSignIn } from 'store/user/user.slice';

const Signin = ({}: SigninProps) => {
  const dispatch = useAppDispatch();

  const [formField, setFormField] = useState(defaultFormFields);
  const { email, password } = formField;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;

    setFormField({ ...formField, [name]: value });
  };

  const handleSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();

    try {
      dispatch(emailSignIn({ email: email.trim(), password: password.trim() }));

      resetFormFields();
    } catch (err) {
      const error = err as Error | FirebaseError;

      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/wrong-password': {
            alert('Invalid Credentials');
            break;
          }
          case 'auth/user-not-found': {
            alert('Invalid Credentials');
            break;
          }
          default:
            break;
        }
      } else {
        console.log(error);
      }
    }
  };

  const signinWithGoogle = async () => {
    dispatch(googleSignIn());
  };

  const resetFormFields = () => {
    setFormField(defaultFormFields);
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?'</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          id="signinEmail"
          required
          onChange={handleChange}
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          id="signinPassword"
          required
          autoComplete="off"
          onChange={handleChange}
          value={password}
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            buttonType="google-sign-in"
            type="button"
            onClick={signinWithGoogle}
          >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Signin;

// Types
export type SigninProps = {};

// Value
const defaultFormFields = {
  email: '',
  password: '',
};
