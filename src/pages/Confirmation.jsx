import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, amount } = location.state || {};

  useEffect(() => {
    if (!orderId) navigate("/");
  }, [orderId, navigate]);

  if (!orderId) return null;

  return (
    <div className="section container">
      <div className="success-container">
        <div className="success-icon">✓</div>
        <h1>Order Confirmed!</h1>
        <p>Thank you for your purchase. Your order has been successfully placed.</p>
        <div
          style={{
            background: "white",
            padding: "2rem",
            borderRadius: "1rem",
            margin: "2rem 0",
            textAlign: "left",
            boxShadow: "var(--shadow)",
          }}
        >
          <p>
            <strong>Order ID:</strong> {orderId}
          </p>
          <p>
            <strong>Amount:</strong> ${amount?.toFixed(2)}
          </p>
          <p>
            <strong>Delivery in 3-5 business days</strong>
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
