import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import "./Checkout.css";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  address: "",
  postalCode: "",
  country: "",
};

export default function Checkout() {
  const { cart, user, placeOrder, notify } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    if (cart.length === 0) {
      navigate("/cart");
    }
  }, [user, cart.length, navigate]);

  const { subtotal, tax, total } = useMemo(() => {
    const sub = cart.reduce(
      (sum, item) => sum + parseFloat(item.price || 0) * (item.quantity || 1),
      0
    );
    const taxAmount = sub * 0.1;
    return { subtotal: sub, tax: taxAmount, total: sub + taxAmount };
  }, [cart]);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const required = Object.values(form);
    if (required.some((v) => !v)) {
      notify("Please fill all fields", "error");
      return;
    }
    const order = placeOrder(form, total);
    navigate("/confirmation", { state: { orderId: order.id, amount: order.total } });
  };

  if (!user || cart.length === 0) return null;

  return (
    <div className="section container">
      <h2 className="section-title">Checkout</h2>
      <div className="checkout-grid">
        <div className="checkout-card">
          <h2 className="checkout-heading">Shipping Address</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={handleChange("fullName")}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange("email")}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange("phone")}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  type="text"
                  value={form.city}
                  onChange={handleChange("city")}
                  required
                />
              </div>
            </div>
            <div className="form-group form-grid-full">
              <label htmlFor="address">Street Address</label>
              <input
                id="address"
                type="text"
                value={form.address}
                onChange={handleChange("address")}
                required
              />
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="postalCode">Postal Code</label>
                <input
                  id="postalCode"
                  type="text"
                  value={form.postalCode}
                  onChange={handleChange("postalCode")}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  id="country"
                  type="text"
                  value={form.country}
                  onChange={handleChange("country")}
                  required
                />
              </div>
            </div>

            <h2 className="checkout-heading" style={{ marginTop: "2rem" }}>
              Payment Method
            </h2>
            <div className="payment-options">
              <div className="payment-option">
                <input type="radio" id="paymentCod" name="payment" value="cod" defaultChecked />
                <label htmlFor="paymentCod">
                  <span className="payment-option-title">Cash on Delivery</span>
                  <span className="payment-option-desc">Pay when your order arrives</span>
                </label>
              </div>
              <div className="payment-option payment-option-disabled">
                <input type="radio" id="paymentStripe" name="payment" value="stripe" disabled />
                <label htmlFor="paymentStripe">
                  <span className="payment-option-title">
                    Credit/Debit Card (Coming Soon)
                  </span>
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block checkout-submit">
              Place Order
            </button>
          </form>
        </div>

        <div className="checkout-card checkout-summary-card">
          <h2 className="checkout-heading">Order Summary</h2>
          <div className="checkout-items">
            {cart.map((item) => (
              <div className="checkout-item-row" key={item.id}>
                <div>
                  <p className="checkout-item-name">{item.name}</p>
                  <p className="checkout-item-qty">Qty: {item.quantity || 1}</p>
                </div>
                <p className="checkout-item-price">
                  ${(parseFloat(item.price || 0) * (item.quantity || 1)).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span style={{ color: "#10b981" }}>Free</span>
          </div>
          <div className="summary-row">
            <span>Tax (10%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
