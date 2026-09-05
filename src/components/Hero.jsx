import { useNavigate } from "react-router-dom";
import "./Hero.css";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-container">
        <h1>Crafted Timepieces for the Discerning</h1>
        <p>
          Explore our collection of meticulously crafted metallic clocks. Each piece
          is a testament to precision engineering and timeless design.
        </p>
        <button className="btn btn-primary" onClick={() => navigate("/shop")}>
          Shop Now
        </button>
      </div>
    </section>
  );
}
