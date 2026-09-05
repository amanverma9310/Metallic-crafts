import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";

const initialForm = {
  name: "",
  brand: "",
  type: "",
  price: "",
  originalPrice: "",
  stock: "10",
  rating: "4.5",
  description: "",
};

export default function AddProductForm() {
  const { addProduct } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [imagePreview, setImagePreview] = useState(null);
  const [alert, setAlert] = useState(null);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setAlert({ type: "error", message: "Image size must be less than 5MB" });
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => setImagePreview(event.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!imagePreview) {
      setAlert({ type: "error", message: "Please upload an image" });
      return;
    }
    if (!form.name || !form.brand || !form.type || !form.price) {
      setAlert({ type: "error", message: "Please fill all required fields" });
      return;
    }

    addProduct({
      name: form.name,
      brand: form.brand,
      type: form.type,
      price: parseFloat(form.price),
      originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
      stock: parseInt(form.stock, 10) || 0,
      rating: parseFloat(form.rating) || 4,
      description: form.description,
      image: imagePreview,
    });

    setAlert({ type: "success", message: "Product added successfully!" });
    setForm(initialForm);
    setImagePreview(null);

    setTimeout(() => navigate("/admin/products"), 1200);
  };

  return (
    <div>
      <h3 className="admin-section-heading">Add New Product</h3>
      <form className="admin-form" onSubmit={handleSubmit} noValidate>
        {alert && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}

        <div className="form-group">
          <label htmlFor="productName">Product Name *</label>
          <input
            id="productName"
            type="text"
            value={form.name}
            onChange={handleChange("name")}
            required
          />
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="productBrand">Brand *</label>
            <input
              id="productBrand"
              type="text"
              value={form.brand}
              onChange={handleChange("brand")}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="productType">Clock Type *</label>
            <select
              id="productType"
              value={form.type}
              onChange={handleChange("type")}
              required
            >
              <option value="">Select Type</option>
              <option value="wall">Wall Clock</option>
              <option value="alarm">Alarm Clock</option>
              <option value="luxury">Luxury Clock</option>
            </select>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="productPrice">Price ($) *</label>
            <input
              id="productPrice"
              type="number"
              step="0.01"
              value={form.price}
              onChange={handleChange("price")}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="productOriginalPrice">Original Price ($)</label>
            <input
              id="productOriginalPrice"
              type="number"
              step="0.01"
              value={form.originalPrice}
              onChange={handleChange("originalPrice")}
            />
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="productStock">Stock Count *</label>
            <input
              id="productStock"
              type="number"
              value={form.stock}
              onChange={handleChange("stock")}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="productRating">Rating (0-5)</label>
            <input
              id="productRating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={form.rating}
              onChange={handleChange("rating")}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="productDescription">Description</label>
          <textarea
            id="productDescription"
            rows="3"
            value={form.description}
            onChange={handleChange("description")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="productImage">Product Image *</label>
          <div className="file-input-wrapper">
            <label className="file-input-label" htmlFor="productImage">
              <span>Click to upload an image</span>
            </label>
            <input
              id="productImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input-hidden"
              required
            />
          </div>
          {imagePreview && (
            <div className="file-preview">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-success btn-block">
          Add Product
        </button>
      </form>
    </div>
  );
}
