import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import ProductImage from "../../components/ProductImage";

export default function ProductsTable() {
  const { products, deleteProduct, notify } = useApp();

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(productId);
    }
  };

  const handleEdit = () => {
    notify("Edit feature coming soon. You can delete and re-add the product for now.", "info");
  };

  return (
    <div>
      <h3 className="admin-section-heading">Manage Products</h3>
      {products.length === 0 ? (
        <p style={{ color: "#6b7280" }}>
          No products yet. <Link to="/admin/add-product">Add one</Link>
        </p>
      ) : (
        <div className="table-scroll">
          <table className="product-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Type</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="table-thumb">
                      <ProductImage src={product.image} alt={product.name} />
                    </div>
                  </td>
                  <td>{product.name}</td>
                  <td>
                    <span className="badge badge-primary">{product.type}</span>
                  </td>
                  <td>${parseFloat(product.price || 0).toFixed(2)}</td>
                  <td>{product.stock || 0}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn btn-secondary btn-sm" onClick={handleEdit}>
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
