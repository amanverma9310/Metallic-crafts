import { useNavigate } from "react-router-dom";
import "./CategoryGrid.css";

const CATEGORIES = [
  { type: "wall", icon: "🕐", label: "Wall Clocks" },
  { type: "alarm", icon: "⏰", label: "Alarm Clocks" },
  { type: "luxury", icon: "⌚", label: "Luxury Clocks" },
];

export default function CategoryGrid() {
  const navigate = useNavigate();

  return (
    <section className="section container">
      <h2 className="section-title">Shop by Category</h2>
      <div className="grid category-grid">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.type}
            className="category-card"
            onClick={() => navigate(`/shop?type=${cat.type}`)}
          >
            <div className="category-icon" aria-hidden="true">
              {cat.icon}
            </div>
            <h3>{cat.label}</h3>
          </button>
        ))}
      </div>
    </section>
  );
}
