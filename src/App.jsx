import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotificationStack from "./components/NotificationStack";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";
import AdminLoginModal from "./components/AdminLoginModal";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ProductsTable from "./pages/admin/ProductsTable";
import AddProductForm from "./pages/admin/AddProductForm";
import Orders from "./pages/admin/Orders";
import Settings from "./pages/admin/Settings";

export default function App() {
  const [activeModal, setActiveModal] = useState(null); // 'login' | 'signup' | 'admin' | null
  const location = useLocation();

  // Reset scroll position on route change, mirroring the original showPage() behavior
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Navbar
        onOpenLogin={() => setActiveModal("login")}
        onOpenSignup={() => setActiveModal("signup")}
        onOpenAdminLogin={() => setActiveModal("admin")}
      />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductsTable />} />
            <Route path="add-product" element={<AddProductForm />} />
            <Route path="orders" element={<Orders />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </main>

      <Footer />

      <NotificationStack />

      <LoginModal
        isOpen={activeModal === "login"}
        onClose={() => setActiveModal(null)}
        onSwitchToSignup={() => setActiveModal("signup")}
      />
      <SignupModal
        isOpen={activeModal === "signup"}
        onClose={() => setActiveModal(null)}
        onSwitchToLogin={() => setActiveModal("login")}
      />
      <AdminLoginModal
        isOpen={activeModal === "admin"}
        onClose={() => setActiveModal(null)}
      />
    </>
  );
}
