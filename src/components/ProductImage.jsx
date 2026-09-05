import { useState } from "react";
import "./ProductImage.css";

/**
 * Renders a product image, falling back to a styled placeholder
 * if the image fails to load (mirrors the original imgError() behavior).
 */
export default function ProductImage({ src, alt, className }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div className="ph-box">
        <span className="ph-icon" aria-hidden="true">
          🕐
        </span>
        <span className="ph-title">Image unavailable</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
