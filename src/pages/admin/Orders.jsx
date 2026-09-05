import { useApp } from "../../context/AppContext";

export default function Orders() {
  const { orders } = useApp();

  return (
    <div>
      <h3 className="admin-section-heading">Orders</h3>
      {orders.length === 0 ? (
        <p style={{ color: "#6b7280" }}>No orders yet</p>
      ) : (
        <div>
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-card-grid">
                <div>
                  <p className="order-card-label">Order ID</p>
                  <p className="order-card-value">{order.id}</p>
                </div>
                <div>
                  <p className="order-card-label">Amount</p>
                  <p className="order-card-value order-card-amount">
                    ${(order.total || 0).toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="order-card-label">Status</p>
                  <p>
                    <span className="badge badge-success">{order.status}</span>
                  </p>
                </div>
              </div>
              <p className="order-card-customer">
                Customer: {order.user?.name || "N/A"} | {order.date}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
