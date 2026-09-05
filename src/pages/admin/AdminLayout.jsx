import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import "./Admin.css";

const MENU = [
  { to: "/admin", label: "📊 Dashboard", end: true },
  { to: "/admin/products", label: "📦 Products" },
  { to: "/admin/add-product", label: "➕ Add Product" },
  { to: "/admin/orders", label: "📋 Orders" },
  { to: "/admin/settings", label: "⚙️ Settings" },
];

export default function AdminLayout() {
  const { adminUser, adminLogout } = useApp();
  const navigate = useNavigate();

  if (!adminUser) {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    adminLogout();
    navigate("/");
  };

  return (
    <div className="section container">
      <h2 className="section-title">Admin Dashboard</h2>
      <div className="admin-container">
        <aside className="admin-sidebar">
          <h2>Admin Menu</h2>
          <ul className="admin-menu">
            {MENU.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    "admin-menu-btn" + (isActive ? " active" : "")
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="admin-menu-logout">
              <button className="admin-menu-btn admin-logout-btn" onClick={handleLogout}>
                🚪 Logout
              </button>
            </li>
          </ul>
        </aside>

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
