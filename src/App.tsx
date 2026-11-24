import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SiteLayout } from './components/SiteLayout';
import { Loading, NotFound } from './components/ui';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmedPage } from './pages/OrderConfirmedPage';
import { MyOrdersPage } from './pages/MyOrdersPage';
import { CustomCakePage } from './pages/CustomCakePage';
import { QuotePage } from './pages/QuotePage';

// Staff screens are split into separate chunks so customers never download them.
// TODO (login): protect /admin (owner) and /delivery (delivery staff) with phone
// OTP login + server-side role checks before launch.
const AdminLayout = lazy(() => import('./admin/AdminLayout'));
const OrdersBoard = lazy(() => import('./admin/OrdersBoard'));
const OrderDetail = lazy(() => import('./admin/OrderDetail'));
const CustomRequests = lazy(() => import('./admin/CustomRequests'));
const CustomRequestDetail = lazy(() => import('./admin/CustomRequestDetail'));
const MenuManager = lazy(() => import('./admin/MenuManager'));
const SettingsPage = lazy(() => import('./admin/SettingsPage'));
const DailySummary = lazy(() => import('./admin/DailySummary'));
const DeliveryPage = lazy(() => import('./delivery/DeliveryPage'));

export function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="product/:slug" element={<ProductPage />} />
          <Route path="custom-cake" element={<CustomCakePage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="order/:id" element={<OrderConfirmedPage />} />
          <Route path="orders" element={<MyOrdersPage />} />
          <Route path="quote/:id" element={<QuotePage />} />
          <Route path="*" element={<div className="container section"><NotFound /></div>} />
        </Route>
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<OrdersBoard />} />
          <Route path="orders/:id" element={<OrderDetail />} />
          <Route path="custom" element={<CustomRequests />} />
          <Route path="custom/:id" element={<CustomRequestDetail />} />
          <Route path="menu" element={<MenuManager />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="summary" element={<DailySummary />} />
        </Route>
        <Route path="delivery" element={<DeliveryPage />} />
      </Routes>
    </Suspense>
  );
}
