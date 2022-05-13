import { configureStore, combineReducers } from '@reduxjs/toolkit';

import middlewares from './middlewares';
import userReducer from './user/user.slice';
import categoriesReducer from './categories/categories.slice';
import cartReducer from './cart/cart.slice';

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      // serializableCheck: { ignoredActions: ['user/setCurrentUser'] },
      serializableCheck: false,
    }).concat(middlewares);
  },
});

/* Types */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
