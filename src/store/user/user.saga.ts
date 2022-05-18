import { all, call, put, takeLatest } from 'typed-redux-saga';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from 'firebase/auth';
import type { FirebaseError } from 'firebase/app';

import {
  notAuthenticated,
  signInFailure,
  signInSuccess,
  signUpFailure,
  signUpSuccess,
  type SignInPayload,
  type SignUpPayload,
  type SignUpSuccessPayload,
  USER_ACTION_TYPES,
  signOutFailure,
  signOutSuccess,
} from './user.slice';

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  type UserData,
  type AdditionalInformation,
  signOutUser,
} from 'utils/firebase/firebase.utils';

export function* getSnapshotFromUserAuth(
  user: User,
  additionalInformation?: AdditionalInformation
) {
  try {
    const userSnapshot = yield* call(
      createUserDocumentFromAuth,
      user,
      additionalInformation
    );

    if (userSnapshot) {
      yield* put(
        signInSuccess({
          id: userSnapshot.id,
          ...(userSnapshot.data() as UserData),
        })
      );
    }
  } catch (error) {
    yield* put(signInFailure(error as Error | FirebaseError));
  }
}

export function* isUserAuthenticated() {
  try {
    const user = yield* call(getCurrentUser);

    if (!user) {
      yield* put(notAuthenticated());
      return;
    }

    yield* call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield* put(signInFailure(error as Error | FirebaseError));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);

    yield* call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield* put(signInFailure(error as Error | FirebaseError));
  }
}

export function* signInWithEmail({
  payload: { email, password },
}: PayloadAction<SignInPayload>) {
  try {
    const userCredential = yield* call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );

    if (userCredential) {
      yield* call(getSnapshotFromUserAuth, userCredential.user);
    }
  } catch (error) {
    yield* put(signInFailure(error as Error | FirebaseError));
  }
}

export function* signUp({
  payload: { email, password, displayName },
}: PayloadAction<SignUpPayload>) {
  try {
    const userCredential = yield* call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );

    if (userCredential) {
      yield* put(signUpSuccess({ user: userCredential.user, displayName }));
    }
  } catch (error) {
    yield* put(signUpFailure(error as Error | FirebaseError));
  }
}

export function* signInAfterSignup({
  payload: { user, displayName },
}: PayloadAction<SignUpSuccessPayload>) {
  yield* call(getSnapshotFromUserAuth, user, { displayName });
}

export function* signOut() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess());
  } catch (error) {
    yield* put(signOutFailure(error as Error | FirebaseError));
  }
}

export function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onGoogleSignIn() {
  yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN, signInWithGoogle);
}

export function* onEmailSignIn() {
  yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN, signInWithEmail);
}

export function* onSignUp() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP, signUp);
}

export function* onSignUpSuccess() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignup);
}

export function* onSignOut() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT, signOut);
}

export function* userSagas() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignIn),
    call(onEmailSignIn),
    call(onSignUp),
    call(onSignUpSuccess),
    call(onSignOut),
  ]);
}
