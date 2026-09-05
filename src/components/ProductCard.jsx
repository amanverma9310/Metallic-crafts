import { useApp } from "../context/AppContext";
import ProductImage from "./ProductImage";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { addToCart, notify } = useApp();

  const discount = product.discount || 0;
  const price = parseFloat(product.price).toFixed(2);
  const originalPrice = product.originalPrice
    ? parseFloat(product.originalPrice).toFixed(2)
    : null;
  const rating = Math.floor(product.rating || 4);
  const reviews = product.reviews || 0;

  return (
    <article className="product-card">
      <div className="product-image">
        <ProductImage src={product.image} alt={product.name} />
        {discount > 0 && <div className="product-badge">-{discount}%</div>}
      </div>
      <div className="product-info">
        <p className="product-brand">{product.brand || "Unknown"}</p>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-rating" aria-label={`Rated ${rating} out of 5`}>
          {"★".repeat(rating)} ({reviews} reviews)
        </div>
        <div className="product-price">
          <span className="price">${price}</span>
          {originalPrice && <span className="original-price">${originalPrice}</span>}
        </div>
        <div className="product-actions">
          <button className="btn btn-primary" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
          <button
            className="wishlist-btn"
            aria-label="Add to wishlist"
            onClick={() => notify("Added to wishlist!", "success")}
          >
            ♡
          </button>
        </div>
      </div>
    </article>
  );
}
