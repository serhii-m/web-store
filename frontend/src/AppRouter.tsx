import React, { useState } from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./store";
import {authRoutes, publicRoutes} from './routes';
import StorePage from './pages/StorePage';
import CartPage from './pages/CartPage';
import ProductPage from './pages/ProductPage';
import OrderPage from './pages/OrderPage';
import StripeContainer from './stripe/StripeContainer';
import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  PRODUCT_ROUTE,
  STORE_ROUTE,
  CART_ROUTE,
  PAYMENT_ROUTE,
  ORDER_ROUTE
} from "./utils/consts";
import StoreContent from './layouts/StoreContent';


const AppRouter: React.FC = () => {

  return (
    <Provider store={store}>
      <Routes>
        <Route path={STORE_ROUTE} element={<StorePage />}>
          <Route index element={<StoreContent/>} />
          <Route path={STORE_ROUTE + '/:slug'} element={<ProductPage />} />
          <Route path={CART_ROUTE} element={<CartPage />} />
        </Route>
        <Route path={ORDER_ROUTE} element={<OrderPage />} />

{/* <Route path={PAYMENT_ROUTE} element={<StripeContainer />} /> */}
      </Routes>
    </Provider>
  );
};

export default AppRouter;