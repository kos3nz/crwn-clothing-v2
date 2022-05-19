import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type FirebaseError } from 'firebase/app';
import { type User } from 'firebase/auth';

import { type UserData } from 'utils/firebase/firebase.utils';

/* State */
const INITIAL_STATE: UserState = {
  currentUser: undefined,
  isLoading: false,
  error: undefined,
};

/* Action Types */
export const USER_ACTION_TYPES = {
  CHECK_USER_SESSION: 'user/checkUserSession',
  GOOGLE_SIGN_IN: 'user/googleSignIn',
  EMAIL_SIGN_IN: 'user/emailSignIn',
  NOT_AUTHENTICATED: 'user/notAuthenticated',
  SIGN_UP: 'user/signUp',
  SIGN_UP_SUCCESS: 'user/signUpSuccess',
  SIGN_OUT: 'user/signOut',
} as const;

/* Redux Toolkit Slice */
const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    checkUserSession: (state) => {
      state.isLoading = true;
    },
    googleSignIn: (state) => {
      state.isLoading = true;
    },
    emailSignIn: (state, action: PayloadAction<SignInPayload>) => {
      state.isLoading = true;
    },
    signInSuccess: (state, action: PayloadAction<UserPayload | null>) => {
      state.currentUser = action.payload;
      state.error = undefined;
      state.isLoading = false;
    },
    signInFailure: (state, action: PayloadAction<Error | FirebaseError>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    signUp: (state, action: PayloadAction<SignUpPayload>) => {
      state.isLoading = true;
    },
    signUpSuccess: (state, action: PayloadAction<SignUpSuccessPayload>) => {},
    signUpFailure: (state, action: PayloadAction<Error | FirebaseError>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    signOut: (state) => {
      state.isLoading = true;
    },
    signOutSuccess: (state) => {
      state.isLoading = false;
      state.currentUser = null;
    },
    signOutFailure: (state, action: PayloadAction<Error | FirebaseError>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    notAuthenticated: (state) => {
      state.currentUser = null;
      state.isLoading = false;
    },
  },
});

export const {
  checkUserSession,
  emailSignIn,
  googleSignIn,
  signInSuccess,
  signInFailure,
  signUp,
  signUpSuccess,
  signUpFailure,
  signOut,
  signOutSuccess,
  signOutFailure,
  notAuthenticated,
} = userSlice.actions;

export default userSlice.reducer;

/* Types */
export type UserState = {
  readonly currentUser: UserPayload | null | undefined;
  readonly isLoading: boolean;
  readonly error: Error | FirebaseError | undefined;
};

export type UserPayload = {
  id: string;
} & UserData;

export type SignInPayload = {
  email: string;
  password: string;
};

export type SignUpPayload = {
  displayName: string;
  email: string;
  password: string;
};

export type SignUpSuccessPayload = {
  displayName: string;
  user: User;
};
