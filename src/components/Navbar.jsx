import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import logo from "../assets/img/metallic-crafts.jpg";
import "./Navbar.css";

const CATEGORY_LINKS = [
  { label: "Shop", to: "/shop" },
  { label: "Wall Clocks", to: "/shop?type=wall" },
  { label: "Alarm Clocks", to: "/shop?type=alarm" },
  { label: "Luxury Clocks", to: "/shop?type=luxury" },
];

export default function Navbar({ onOpenLogin, onOpenSignup, onOpenAdminLogin }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, adminUser, cartCount } = useApp();
  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav>
      <div className="nav-container container">
        <button
          className="menu-toggle"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        <Link to="/" className="logo" onClick={closeMenu}>
          <img className="metallic" src={logo} alt="" />
          <span className="logo-text">Metallic Crafts</span>
        </Link>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          {CATEGORY_LINKS.map((link) => (
            <li key={link.label}>
              <Link to={link.to} onClick={closeMenu}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <button
            className="cart-icon"
            aria-label={`View cart, ${cartCount} items`}
            onClick={() => navigate("/cart")}
          >
            🛒
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>

          {adminUser && (
            <button
              className="btn btn-primary btn-sm admin-btn"
              onClick={() => navigate("/admin")}
            >
              👤 Admin Panel
            </button>
          )}

          {user ? (
            <>
              <span className="nav-username">👤 {user.name}</span>
              <button className="btn btn-secondary btn-sm" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-primary btn-sm" onClick={onOpenLogin}>
                Login
              </button>
              <button className="btn btn-secondary btn-sm" onClick={onOpenSignup}>
                Sign Up
              </button>
            </>
          )}

          {!adminUser && (
            <button
              className="btn btn-primary btn-sm admin-btn-purple"
              onClick={onOpenAdminLogin}
            >
              Admin
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
