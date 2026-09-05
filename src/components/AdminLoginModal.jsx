import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useApp } from "../context/AppContext";

export default function AdminLoginModal({ isOpen, onClose }) {
  const { adminLogin } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setError("");
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = adminLogin(email, password);
    if (result.success) {
      handleClose();
      navigate("/admin");
    } else {
      setError(result.error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Admin Login" maxWidth="450px">
      <h2 className="modal-title">🔐 Admin Login</h2>
      <form onSubmit={handleSubmit} noValidate>
        {error && <div className="alert alert-error">{error}</div>}
        <div className="form-group">
          <label htmlFor="adminEmail">Email Address</label>
          <input
            id="adminEmail"
            type="email"
            placeholder="admin@clockstore.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="adminPassword">Password</label>
          <input
            id="adminPassword"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: "1rem" }}>
          Login to Admin Panel
        </button>
      </form>
      <div className="demo-account-box">
        <p>
          <strong>✓ Demo Admin Account:</strong>
        </p>
        <p style={{ marginTop: "0.5rem" }}>
          <strong>Email:</strong> admin@clockstore.com
        </p>
        <p>
          <strong>Password:</strong> admin123
        </p>
      </div>
    </Modal>
  );
}
