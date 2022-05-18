import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from 'routes/home/home.component';
import Navigation from 'routes/navigation/navigation.component';
import Shop from 'routes/shop/shop.component';
import Auth from 'routes/authentication/authentication.component';
import Checkout from 'routes/checkout/checkout.component';
import { useAppDispatch } from 'store/hooks';
import { checkUserSession } from 'store/user/user.slice';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
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
