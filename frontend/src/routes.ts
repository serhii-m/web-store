import {ADMIN_ROUTE, CART_ROUTE, PRODUCT_ROUTE,
  LOGIN_ROUTE, REGISTRATION_ROUTE,
  STORE_ROUTE, PAYMENT_ROUTE} from "./utils/consts";

import CartPage from "./pages/CartPage";
import StorePage from "./pages/StorePage";
import AuthPage from "./pages/AuthPage";
import ProductPage from "./pages/ProductPage";
import AdminPage from "./pages/AdminPage";
import StripeContainer from "./stripe/StripeContainer";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: AdminPage
  },
  {
    path: CART_ROUTE,
    Component: CartPage
  },
]

export const publicRoutes = [
  {
    path: STORE_ROUTE,
    Component: StorePage
  },
  {
    path: LOGIN_ROUTE,
    Component: AuthPage
  },
  {
    path: REGISTRATION_ROUTE,
    Component: AuthPage
  },
  {
    path: PRODUCT_ROUTE + '/:id',
    Component: ProductPage
  },
  {
    path: PAYMENT_ROUTE,
    Component: StripeContainer
  },
]