import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import middlewares from './middlewares';
import userReducer from './user/user.slice';
import categoriesReducer from './categories/categories.slice';
import cartReducer from './cart/cart.slice';

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      // serializableCheck: { ignoredActions: ['user/setCurrentUser'] },
      serializableCheck: false,
    }).concat(middlewares);
  },
});

export const persistor = persistStore(store);

/* Types */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
