import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { sampleProducts, ADMIN_CREDENTIALS } from "../data/products";

const AppContext = createContext(null);

let notificationId = 0;

export function AppProvider({ children }) {
  const [user, setUser] = useLocalStorage("user", null);
  const [adminUser, setAdminUser] = useLocalStorage("adminUser", null);
  const [cart, setCart] = useLocalStorage("cart", []);
  const [adminProducts, setAdminProducts] = useLocalStorage("adminProducts", []);
  const [orders, setOrders] = useLocalStorage("orders", []);
  const [adminPassword, setAdminPassword] = useLocalStorage(
    "adminPassword",
    ADMIN_CREDENTIALS.password
  );
  const [notifications, setNotifications] = useState([]);

  // Admin-added products are merged on top of the built-in catalog so
  // edits made in code (sampleProducts) always take effect immediately.
  const products = useMemo(
    () => sampleProducts.concat(adminProducts),
    [adminProducts]
  );

  const notify = useCallback((message, type = "success") => {
    const id = ++notificationId;
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  }, []);

  // ── Cart ──────────────────────────────────────────────────────────
  const addToCart = useCallback(
    (product) => {
      setCart((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          );
        }
        return [...prev, { ...product, quantity: 1 }];
      });
      notify(`${product.name} added to cart!`, "success");
    },
    [setCart, notify]
  );

  const updateQuantity = useCallback(
    (productId, quantity) => {
      if (quantity <= 0) {
        setCart((prev) => prev.filter((item) => item.id !== productId));
        return;
      }
      setCart((prev) =>
        prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
      );
    },
    [setCart]
  );

  const removeFromCart = useCallback(
    (productId) => {
      setCart((prev) => prev.filter((item) => item.id !== productId));
      notify("Item removed from cart", "success");
    },
    [setCart, notify]
  );

  const clearCart = useCallback(() => setCart([]), [setCart]);

  // ── Auth ──────────────────────────────────────────────────────────
  const login = useCallback(
    (email, password) => {
      if (email === "demo@clockstore.com" && password === "demo123") {
        setUser({ id: 1, name: "Demo User", email, role: "user" });
        notify("Logged in successfully!", "success");
        return { success: true };
      }
      return { success: false, error: "Invalid email or password" };
    },
    [setUser, notify]
  );

  const signup = useCallback(
    (name, email, password, confirmPassword) => {
      if (password !== confirmPassword) {
        return { success: false, error: "Passwords do not match" };
      }
      if (password.length < 6) {
        return { success: false, error: "Password must be at least 6 characters" };
      }
      setUser({ id: Date.now(), name, email, role: "user" });
      notify("Account created successfully!", "success");
      return { success: true };
    },
    [setUser, notify]
  );

  const logout = useCallback(() => {
    setUser(null);
    notify("Logged out successfully", "success");
  }, [setUser, notify]);

  // ── Admin ─────────────────────────────────────────────────────────
  const adminLogin = useCallback(
    (email, password) => {
      if (email === ADMIN_CREDENTIALS.email && password === adminPassword) {
        setAdminUser({ email, name: "Admin", role: "admin" });
        notify("Admin logged in successfully!", "success");
        return { success: true };
      }
      return { success: false, error: "Invalid email or password" };
    },
    [adminPassword, setAdminUser, notify]
  );

  const adminLogout = useCallback(() => {
    setAdminUser(null);
    notify("Admin logged out", "success");
  }, [setAdminUser, notify]);

  const changeAdminPassword = useCallback(
    (newPassword) => {
      if (!newPassword || newPassword.length < 6) {
        notify("Password must be at least 6 characters", "error");
        return;
      }
      setAdminPassword(newPassword);
      notify("Admin password updated successfully!", "success");
    },
    [setAdminPassword, notify]
  );

  // ── Products (admin CRUD) ────────────────────────────────────────
  const addProduct = useCallback(
    (productData) => {
      const newProduct = {
        id: Date.now(),
        reviews: 0,
        discount: 0,
        ...productData,
      };
      if (newProduct.originalPrice && newProduct.originalPrice > newProduct.price) {
        newProduct.discount = Math.round(
          ((newProduct.originalPrice - newProduct.price) / newProduct.originalPrice) * 100
        );
      }
      setAdminProducts((prev) => [...prev, newProduct]);
      notify("Product added successfully!", "success");
    },
    [setAdminProducts, notify]
  );

  const deleteProduct = useCallback(
    (productId) => {
      setAdminProducts((prev) => prev.filter((p) => p.id !== productId));
      notify("Product deleted", "success");
    },
    [setAdminProducts, notify]
  );

  const clearAllData = useCallback(() => {
    setAdminProducts([]);
    setOrders([]);
    notify("All data cleared", "success");
  }, [setAdminProducts, setOrders, notify]);

  const importData = useCallback(
    (data) => {
      if (data.products && Array.isArray(data.products)) {
        // Anything not part of the built-in sample catalog is treated as admin-added
        const sampleIds = new Set(sampleProducts.map((p) => p.id));
        setAdminProducts(data.products.filter((p) => !sampleIds.has(p.id)));
      }
      if (data.orders && Array.isArray(data.orders)) {
        setOrders(data.orders);
      }
      notify("Data imported successfully", "success");
    },
    [setAdminProducts, setOrders, notify]
  );

  // ── Orders ────────────────────────────────────────────────────────
  const placeOrder = useCallback(
    (shippingAddress, total) => {
      const orderId = "ORD-" + Date.now();
      const order = {
        id: orderId,
        user,
        items: cart.slice(),
        shippingAddress,
        total,
        date: new Date().toLocaleDateString(),
        status: "pending",
      };
      setOrders((prev) => [...prev, order]);
      clearCart();
      return order;
    },
    [user, cart, setOrders, clearCart]
  );

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + (item.quantity || 1), 0),
    [cart]
  );

  const value = {
    user,
    login,
    signup,
    logout,
    adminUser,
    adminLogin,
    adminLogout,
    changeAdminPassword,
    cart,
    cartCount,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    products,
    addProduct,
    deleteProduct,
    clearAllData,
    importData,
    orders,
    placeOrder,
    notifications,
    notify,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within an AppProvider");
  return ctx;
}
