import { useApp } from "../../context/AppContext";

export default function Dashboard() {
  const { products, orders } = useApp();
  const revenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);

  return (
    <div>
      <h3 className="admin-section-heading">Welcome to Admin Dashboard</h3>
      <div className="grid grid-3">
        <div className="stat-card stat-card-purple">
          <div className="stat-value">{products.length}</div>
          <div className="stat-label">Total Products</div>
        </div>
        <div className="stat-card stat-card-pink">
          <div className="stat-value">{orders.length}</div>
          <div className="stat-label">Total Orders</div>
        </div>
        <div className="stat-card stat-card-blue">
          <div className="stat-value">${revenue.toFixed(0)}</div>
          <div className="stat-label">Total Revenue</div>
        </div>
      </div>
      <div className="alert alert-info" style={{ marginTop: "2rem" }}>
        <p>
          <strong>Quick Tips:</strong>
        </p>
        <ul style={{ marginLeft: "1.5rem", marginTop: "0.5rem" }}>
          <li>Upload product images in JPG or PNG format (max 5MB)</li>
          <li>All product data is stored locally in your browser</li>
          <li>To back up your data, download the JSON export from Settings</li>
        </ul>
      </div>
    </div>
  );
}
