import { useRef, useState } from "react";
import { useApp } from "../../context/AppContext";

export default function Settings() {
  const { products, orders, importData, clearAllData, changeAdminPassword, notify } =
    useApp();
  const fileInputRef = useRef(null);
  const [newPassword, setNewPassword] = useState("");

  const handleDownload = () => {
    const data = {
      products,
      orders,
      exportDate: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `clockstore-backup-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    notify("Data downloaded successfully", "success");
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        importData(data);
      } catch {
        notify("Error importing data. Invalid JSON file.", "error");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure? This will delete ALL products and orders!")) {
      clearAllData();
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    changeAdminPassword(newPassword);
    setNewPassword("");
  };

  return (
    <div>
      <h3 className="admin-section-heading">Settings</h3>

      <div className="settings-card">
        <h4 className="settings-card-title">Data Management</h4>
        <div className="settings-actions-grid">
          <button className="btn btn-primary" onClick={handleDownload}>
            📥 Download Data (JSON)
          </button>
          <button className="btn btn-secondary" onClick={handleUploadClick}>
            📤 Upload Data (JSON)
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <button className="btn btn-danger" onClick={handleClearAll}>
            🗑️ Clear All Data
          </button>
        </div>
      </div>

      <div className="settings-card">
        <h4 className="settings-card-title">Admin Password</h4>
        <form onSubmit={handlePasswordSubmit}>
          <div className="form-group">
            <label htmlFor="newAdminPassword">Change Admin Password</label>
            <div className="password-change-row">
              <input
                id="newAdminPassword"
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="settings-warning-card">
        <h4>⚠️ Current Admin Credentials</h4>
        <p>
          <strong>Email:</strong> admin@clockstore.com
        </p>
        <p>
          <strong>Password:</strong> admin123 (unless changed above)
        </p>
      </div>
    </div>
  );
}
