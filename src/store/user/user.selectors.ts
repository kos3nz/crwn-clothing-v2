import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/store';

const selectUserReducer = (state: RootState) => state.user;

export const selectCurrentUser = createSelector(
  [selectUserReducer],
  (user) => user.currentUser
);
