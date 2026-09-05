import { useState } from "react";
import Modal from "./Modal";
import { useApp } from "../context/AppContext";

export default function SignupModal({ isOpen, onClose, onSwitchToLogin }) {
  const { signup } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleClose = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }
    const result = signup(name, email, password, confirmPassword);
    if (result.success) {
      handleClose();
    } else {
      setError(result.error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Sign Up">
      <h2 className="modal-title">Create Account</h2>
      <p className="modal-subtitle">Join ClockStore today</p>
      <form onSubmit={handleSubmit} noValidate>
        {error && <div className="alert alert-error">{error}</div>}
        <div className="form-group">
          <label htmlFor="signupName">Full Name</label>
          <input
            id="signupName"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="signupEmail">Email Address</label>
          <input
            id="signupEmail"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="signupPassword">Password</label>
          <input
            id="signupPassword"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="signupConfirmPassword">Confirm Password</label>
          <input
            id="signupConfirmPassword"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Sign Up
        </button>
      </form>
      <p className="modal-footer-note">
        Already have an account? <a onClick={onSwitchToLogin}>Login here</a>
      </p>
    </Modal>
  );
}
