import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

/* State */
const INITIAL_STATE: UserState = {
  currentUser: null,
};

/* Redux Toolkit Slice */
const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;

/* Types */
type UserState = {
  currentUser: User | null;
};
