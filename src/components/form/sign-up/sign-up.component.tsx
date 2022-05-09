import { FirebaseError } from 'firebase/app';
import { useState } from 'react';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from 'utils/firebase/firebase.utils';

import FormInput from 'components/form/input/input.component';
import Button from 'components/button/button.component';
import './sign-up.styles.scss';

const Signup = ({}: SignupProps) => {
  const [formField, setFormField] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formField;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;

    setFormField({ ...formField, [name]: value });
  };

  const handleSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('password needs to match');
      return;
    }

    try {
      const response = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      if (response) {
        await createUserDocumentFromAuth(response.user, { displayName });

        resetFormFields();
      }
    } catch (err) {
      const error = err as Error | FirebaseError;
      if (
        error instanceof FirebaseError &&
        error.code === 'auth/email-already-in-use'
      ) {
        alert('Cannot create user, the email already in use');
      } else {
        console.log('User creation encountered an error', error);
      }
    }
  };

  const resetFormFields = () => {
    setFormField(defaultFormFields);
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?'</h2>
      <span>Sign up with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          name="displayName"
          id="displayName"
          required
          onChange={handleChange}
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          name="email"
          id="signupEmail"
          required
          onChange={handleChange}
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          id="signupPassword"
          required
          autoComplete="off"
          onChange={handleChange}
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          required
          autoComplete="off"
          onChange={handleChange}
          value={confirmPassword}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default Signup;

// Types
export type SignupProps = {};

// Value
const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};
