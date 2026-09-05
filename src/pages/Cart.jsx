import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import ProductImage from "../components/ProductImage";
import "./Cart.css";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, user } = useApp();
  const navigate = useNavigate();

  const { subtotal, tax, total } = useMemo(() => {
    const sub = cart.reduce(
      (sum, item) => sum + parseFloat(item.price || 0) * (item.quantity || 1),
      0
    );
    const taxAmount = sub * 0.1;
    return { subtotal: sub, tax: taxAmount, total: sub + taxAmount };
  }, [cart]);

  const handleCheckout = () => {
    if (!user) {
      window.alert("Please login first");
      return;
    }
    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div className="section container">
        <h2 className="section-title">Shopping Cart</h2>
        <div className="empty-state">
          <h2>Your cart is empty</h2>
          <p>Start shopping to add items to your cart</p>
          <button className="btn btn-primary" onClick={() => navigate("/shop")}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="section container">
      <h2 className="section-title">Shopping Cart</h2>
      <div className="cart-container">
        <div className="cart-items">
          {cart.map((item) => {
            const price = parseFloat(item.price || 0).toFixed(2);
            const itemSubtotal = (
              parseFloat(item.price || 0) * (item.quantity || 1)
            ).toFixed(2);
            return (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-image">
                  <ProductImage src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>{item.brand}</p>
                  <p className="price">${price}</p>
                  <div className="quantity-control">
                    <button
                      aria-label="Decrease quantity"
                      onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                    >
                      −
                    </button>
                    <span>{item.quantity || 1}</span>
                    <button
                      aria-label="Increase quantity"
                      onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
                <div className="cart-item-total">
                  <p>${itemSubtotal}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="cart-summary">
          <h2 style={{ marginBottom: "1.5rem" }}>Order Summary</h2>
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
          <button
            className="btn btn-primary btn-block"
            style={{ marginTop: "1.5rem" }}
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
