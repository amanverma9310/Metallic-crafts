import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-section">
          <h3>About ClockStore</h3>
          <p>
            Premium timepieces for every moment. Discover our exquisite collection of
            wall, alarm, and luxury clocks.
          </p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <Link to="/shop">Shop</Link>
          <Link to="/shop?type=wall">Wall Clocks</Link>
          <Link to="/shop?type=alarm">Alarm Clocks</Link>
          <Link to="/shop?type=luxury">Luxury Clocks</Link>
        </div>
        <div className="footer-section">
          <h3>Support</h3>
          <a href="#contact">Contact Us</a>
          <a href="#shipping">Shipping Info</a>
          <a href="#returns">Returns</a>
          <a href="#faq">FAQ</a>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <a href="#facebook">Facebook</a>
          <a href="#instagram">Instagram</a>
          <a href="#twitter">Twitter</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ClockStore. All rights reserved.</p>
      </div>
    </footer>
  );
}
