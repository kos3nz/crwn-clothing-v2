import {
  configureStore,
  combineReducers,
  type Middleware,
} from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  PersistConfig,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import CreateSagaMiddleware from 'redux-saga';

import userReducer from './user/user.slice';
import categoriesReducer from './categories/categories.slice';
import cartReducer from './cart/cart.slice';
import { rootSaga } from './root-saga';

/* Middleware */
const sagaMiddleware = CreateSagaMiddleware();

const middlewares: Middleware[] = [sagaMiddleware];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

/* Reducer */
export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
});

const persistConfig: ExtendedPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/* Store */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewares);
  },
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

/* Types */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

type RootReducer = ReturnType<typeof rootReducer>;

type ExtendedPersistConfig = PersistConfig<RootReducer> & {
  whitelist: (keyof RootReducer)[];
};
