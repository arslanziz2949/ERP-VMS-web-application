import React, { useState } from "react";
import { useThemeValues } from "../Theme/Theme";

const Inventory = () => {
  const theme = useThemeValues();

  const [inventory, setInventory] = useState([
    { id: 1, sku: "CAM-PRO-001", name: "Security Camera Pro", quantity: 150, location: "Main Warehouse" },
    { id: 2, sku: "RT-BAS-002", name: "Wi-Fi Router Basic", quantity: 89, location: "West Coast" },
    { id: 3, sku: "DB-SMT-003", name: "Smart Doorbell", quantity: 234, location: "Main Warehouse" },
    { id: 4, sku: "CAM-4K-004", name: "4K Surveillance Camera", quantity: 45, location: "Texas Depot" },
  ]);

  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ sku: "", name: "", quantity: "", location: "" });

  const isLowStock = (qty) => Number(qty) < 100;

  const saveItem = () => {
    if (editingItem?.id) {
      setInventory((prev) =>
        prev.map((i) => (i.id === editingItem.id ? { ...i, ...formData } : i))
      );
    } else {
      setInventory((prev) => [...prev, { id: Date.now(), ...formData }]);
    }
    setEditingItem(null);
    setFormData({ sku: "", name: "", quantity: "", location: "" });
  };

  const deleteItem = (id) => {
    if (window.confirm("Delete this item?")) {
      setInventory((prev) => prev.filter((i) => i.id !== id));
    }
  };

  return (
    <div style={{ padding: "24px", background: theme.palette.bg.body }}>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h1 style={{ margin: 0, color: theme.palette.text.primary }}>
            Inventory Management
          </h1>
          <p style={{ color: theme.palette.text.secondary }}>
            Track and manage all inventory items
          </p>
        </div>

        <button
          onClick={() => setEditingItem({})}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: "none",
            background: theme.palette.primary,
            color: "#fff",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          + Add Item
        </button>
      </div>

      {/* TABLE */}
      <div
        style={{
          background: theme.palette.bg.card,
          borderRadius: "12px",
          overflow: "hidden",
          border: `1px solid ${theme.palette.border}`,
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: theme.palette.bg.body }}>
              {["SKU", "Product Name", "Quantity", "Location", "Stock Status", "Actions"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    fontSize: "14px",
                    color: theme.palette.text.secondary,
                    borderBottom: `1px solid ${theme.palette.border}`,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {inventory.map((item) => {
              const lowStock = isLowStock(item.quantity);

              return (
                <tr key={item.id}>
                  <td style={{ padding: "12px", borderBottom: `1px solid ${theme.palette.border}`, color: theme.palette.text.primary }}>
                    {item.sku}
                  </td>

                  <td style={{ padding: "12px", borderBottom: `1px solid ${theme.palette.border}`, color: theme.palette.text.primary }}>
                    {item.name}
                  </td>

                  <td style={{ padding: "12px", borderBottom: `1px solid ${theme.palette.border}` }}>
                    <span style={{ fontWeight: 600, color: lowStock ? "#ef4444" : theme.palette.text.primary }}>
                      {item.quantity}
                    </span>
                  </td>

                  <td style={{ padding: "12px", borderBottom: `1px solid ${theme.palette.border}`, color: theme.palette.text.primary }}>
                    {item.location}
                  </td>

                  <td style={{ padding: "12px", borderBottom: `1px solid ${theme.palette.border}` }}>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "999px",
                        fontSize: "12px",
                        background: lowStock ? "rgba(239,68,68,0.15)" : theme.palette.primaryLight,
                        color: lowStock ? "#ef4444" : theme.palette.primary,
                      }}
                    >
                      {lowStock ? "Low Stock" : "In Stock"}
                    </span>
                  </td>

                  <td style={{ padding: "12px", borderBottom: `1px solid ${theme.palette.border}` }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => {
                          setEditingItem(item);
                          setFormData(item);
                        }}
                        style={{
                          padding: "6px 10px",
                          borderRadius: "6px",
                          border: `1px solid ${theme.palette.border}`,
                          background: "transparent",
                          color: theme.palette.text.primary,
                          cursor: "pointer",
                        }}
                      >
                        Update
                      </button>

                      <button
                        onClick={() => deleteItem(item.id)}
                        style={{
                          padding: "6px 10px",
                          borderRadius: "6px",
                          border: "none",
                          background: "#ef4444",
                          color: "#fff",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {editingItem !== null && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 3000,
          }}
        >
          <div
            style={{
              background: theme.palette.bg.card,
              padding: "24px",
              borderRadius: "12px",
              width: "380px",
            }}
          >
            <h3 style={{ marginBottom: "16px", color: theme.palette.text.primary }}>
              {editingItem.id ? "Update Item" : "Add Item"}
            </h3>

            {["sku", "name", "quantity", "location"].map((field) => (
              <input
                key={field}
                placeholder={field.toUpperCase()}
                value={formData[field]}
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "12px",
                  borderRadius: "6px",
                  border: `1px solid ${theme.palette.border}`,
                  background: theme.palette.bg.body,
                  color: theme.palette.text.primary,
                }}
              />
            ))}

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                onClick={() => setEditingItem(null)}
                style={{
                  padding: "8px 14px",
                  borderRadius: "6px",
                  border: `1px solid ${theme.palette.border}`,
                  background: "transparent",
                  color: theme.palette.text.primary,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>

              <button
                onClick={saveItem}
                style={{
                  padding: "8px 14px",
                  borderRadius: "6px",
                  border: "none",
                  background: theme.palette.primary,
                  color: "#fff",
                  cursor: "pointer",
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

export default Inventory;
