import React, { useState } from "react";
import { useThemeValues } from "../Theme/Theme";

const Warehouse = () => {
  const theme = useThemeValues();

  const [warehouses, setWarehouses] = useState([
    {
      id: 1,
      warehouse_name: "Main Warehouse",
      warehouse_code: "WH-001",
      city: "New York",
      country: "USA",
      address: "Industrial Area, Block A",
      capacity: 10000,
      current_stock: 4567,
      manager_name: "John Smith",
      phone: "+1 234 567 890",
      email: "manager@warehouse.com",
      status: "active",
    },
  ]);

  const emptyForm = {
    warehouse_name: "",
    warehouse_code: "",
    city: "",
    country: "",
    address: "",
    capacity: "",
    current_stock: "",
    manager_name: "",
    phone: "",
    email: "",
    status: "active",
  };

  const [editingWarehouse, setEditingWarehouse] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: `1px solid ${theme.palette.border}`,
    background: theme.palette.bg.body,
    color: theme.palette.text.primary,
    marginBottom: 12,
    fontSize: 14,
  };

  const openEdit = (warehouse) => {
    setEditingWarehouse(warehouse);
    setFormData(warehouse);
  };

  const saveWarehouse = () => {
    if (editingWarehouse?.id) {
      setWarehouses((prev) =>
        prev.map((w) =>
          w.id === editingWarehouse.id ? { ...w, ...formData } : w
        )
      );
    } else {
      setWarehouses((prev) => [
        ...prev,
        { id: Date.now(), ...formData },
      ]);
    }
    setEditingWarehouse(null);
    setFormData(emptyForm);
  };

  const statusColor = (status) =>
    status === "active"
      ? theme.palette.primary
      : status === "maintenance"
      ? "#f59e0b"
      : "#94a3b8";

  return (
    <div style={{ padding: 24, background: theme.palette.bg.body, minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <h1 style={{ margin: 0, color: theme.palette.text.primary, fontSize: 28 }}>
            Warehouse Management
          </h1>
          <p style={{ marginTop: 6, color: theme.palette.text.secondary }}>
            Manage capacity, stock, and locations
          </p>
        </div>

        <button
          onClick={() => setEditingWarehouse({})}
          style={{
            padding: "12px 18px",
            borderRadius: 10,
            border: "none",
            background: `linear-gradient(135deg, ${theme.palette.primary}, ${theme.palette.primaryLight})`,
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: theme.palette.shadow,
          }}
        >
          + Add Warehouse
        </button>
      </div>

      {/* Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
        {warehouses.map((w) => (
          <div
            key={w.id}
            style={{
              background: theme.palette.bg.card,
              borderRadius: 16,
              padding: 18,
              border: `1px solid ${theme.palette.border}`,
              boxShadow: theme.palette.shadow,
              transition: "transform .2s ease",
            }}
          >
            {/* Top */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ margin: 0, color: theme.palette.text.primary }}>
                  {w.warehouse_name}
                </h3>
                <span style={{ fontSize: 12, color: theme.palette.text.muted }}>
                  {w.warehouse_code}
                </span>
              </div>

              <span
                style={{
                  padding: "6px 12px",
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 600,
                  background: `${statusColor(w.status)}20`,
                  color: statusColor(w.status),
                }}
              >
                {w.status}
              </span>
            </div>

            {/* Info */}
            <div style={{ marginTop: 14, fontSize: 14, color: theme.palette.text.secondary }}>
              <p><strong>📍 Location:</strong> {w.city}, {w.country}</p>
              <p><strong>🏢 Address:</strong> {w.address}</p>
              <p><strong>📦 Capacity:</strong> {w.capacity}</p>
              <p><strong>📊 Stock:</strong> {w.current_stock}</p>
              <p><strong>👤 Manager:</strong> {w.manager_name}</p>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button
                onClick={() => openEdit(w)}
                style={{
                  flex: 1,
                  padding: "8px",
                  borderRadius: 8,
                  border: `1px solid ${theme.palette.border}`,
                  background: "transparent",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                Update
              </button>

              <button
                style={{
                  flex: 1,
                  padding: "8px",
                  borderRadius: 8,
                  border: "none",
                  background: "#ef4444",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {editingWarehouse !== null && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              background: theme.palette.bg.card,
              padding: 24,
              borderRadius: 16,
              width: 420,
              boxShadow: theme.palette.shadowLg,
            }}
          >
            <h3 style={{ marginBottom: 16 }}>
              {editingWarehouse.id ? "Update Warehouse" : "Add Warehouse"}
            </h3>

            {Object.keys(emptyForm).map(
              (key) =>
                key !== "status" && (
                  <input
                    key={key}
                    placeholder={key.replaceAll("_", " ").toUpperCase()}
                    value={formData[key]}
                    onChange={(e) =>
                      setFormData({ ...formData, [key]: e.target.value })
                    }
                    style={inputStyle}
                  />
                )
            )}

            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              style={inputStyle}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="maintenance">Maintenance</option>
            </select>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
              <button
                onClick={() => setEditingWarehouse(null)}
                style={{
                  padding: "10px 16px",
                  borderRadius: 8,
                  border: `1px solid ${theme.palette.border}`,
                  background: "transparent",
                }}
              >
                Cancel
              </button>

              <button
                onClick={saveWarehouse}
                style={{
                  padding: "10px 18px",
                  borderRadius: 8,
                  border: "none",
                  background: theme.palette.primary,
                  color: "#fff",
                  fontWeight: 600,
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Warehouse;
