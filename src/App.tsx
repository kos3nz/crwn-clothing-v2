import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from 'routes/home/home.component';
import Navigation from 'routes/navigation/navigation.component';
import Shop from 'routes/shop/shop.component';
import Auth from 'routes/authentication/authentication.component';
import Checkout from 'routes/checkout/checkout.component';
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from 'utils/firebase/firebase.utils';
import { useAppDispatch } from 'store/hooks';
import { setCurrentUser } from 'store/user/user.slice';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }

      dispatch(setCurrentUser(user));
    });
    return unsubscribe;
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Auth />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
