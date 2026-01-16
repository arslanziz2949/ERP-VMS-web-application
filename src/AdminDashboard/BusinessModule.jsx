import React, { useState } from "react";
import { useThemeValues } from "../Theme/Theme";

const BusinessModule = () => {
  const theme = useThemeValues();

  const [modules, setModules] = useState([
    { id: 1, name: "Inventory Management", status: "active", lastUpdated: "2024-01-15" },
    { id: 2, name: "Sales & CRM", status: "active", lastUpdated: "2024-01-14" },
    { id: 3, name: "Billing System", status: "maintenance", lastUpdated: "2024-01-10" },
    { id: 4, name: "Reporting Dashboard", status: "active", lastUpdated: "2024-01-12" },
    { id: 5, name: "Customer Portal", status: "inactive", lastUpdated: "2024-01-05" },
  ]);

  const [editingModule, setEditingModule] = useState(null);
  const [formData, setFormData] = useState({ name: "", status: "active" });

  const saveModule = () => {
    if (editingModule?.id) {
      setModules((prev) =>
        prev.map((m) => (m.id === editingModule.id ? { ...m, ...formData } : m))
      );
    } else {
      setModules((prev) => [
        ...prev,
        { id: Date.now(), lastUpdated: new Date().toISOString().split("T")[0], ...formData },
      ]);
    }
    setEditingModule(null);
    setFormData({ name: "", status: "active" });
  };

  const deleteModule = (id) => {
    if (window.confirm("Delete this module?")) {
      setModules((prev) => prev.filter((m) => m.id !== id));
    }
  };

  return (
    <div style={{ padding: "24px", background: theme.palette.bg.body }}>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h1 style={{ margin: 0, color: theme.palette.text.primary }}>
            Business Modules
          </h1>
          <p style={{ color: theme.palette.text.secondary }}>
            Manage and configure business modules
          </p>
        </div>

        <button
          onClick={() => setEditingModule({})}
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
          + Add Module
        </button>
      </div>

      {/* MODULES GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "20px",
        }}
      >
        {modules.map((module) => (
          <div
            key={module.id}
            style={{
              background: theme.palette.bg.card,
              border: `1px solid ${theme.palette.border}`,
              borderRadius: "12px",
              padding: "16px",
              boxShadow: theme.palette.shadow,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* ICON + INFO */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: theme.palette.primaryLight,
                  color: theme.palette.primary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 600,
                  marginRight: "12px",
                  fontSize: "16px",
                }}
              >
                {module.name.charAt(0)}
              </div>
              <div>
                <h3 style={{ margin: 0, color: theme.palette.text.primary, fontSize: "16px" }}>
                  {module.name}
                </h3>
                <p style={{ margin: 0, fontSize: "12px", color: theme.palette.text.secondary }}>
                  Last updated: {module.lastUpdated}
                </p>
              </div>
            </div>

            {/* STATUS + ACTIONS */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: "999px",
                  fontSize: "12px",
                  background:
                    module.status === "active"
                      ? theme.palette.primaryLight
                      : module.status === "maintenance"
                      ? "rgba(239,68,68,0.15)"
                      : "rgba(148,163,184,0.2)",
                  color:
                    module.status === "active"
                      ? theme.palette.primary
                      : module.status === "maintenance"
                      ? "#ef4444"
                      : theme.palette.text.muted,
                }}
              >
                {module.status}
              </span>

              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => {
                    setEditingModule(module);
                    setFormData({ name: module.name, status: module.status });
                  }}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: `1px solid ${theme.palette.border}`,
                    background: "transparent",
                    color: theme.palette.text.primary,
                    cursor: "pointer",
                  }}
                >
                  {module.status === "active" ? "Configure" : "Activate"}
                </button>

                <button
                  onClick={() => deleteModule(module.id)}
                  style={{
                    padding: "6px 12px",
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
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {editingModule !== null && (
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
              width: "320px",
              boxShadow: theme.palette.shadowLg,
            }}
          >
            <h3 style={{ marginBottom: "16px", color: theme.palette.text.primary }}>
              {editingModule.id ? "Update Module" : "Add Module"}
            </h3>

            <input
              placeholder="Module Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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

            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "16px",
                borderRadius: "6px",
                border: `1px solid ${theme.palette.border}`,
                background: theme.palette.bg.body,
                color: theme.palette.text.primary,
              }}
            >
              <option value="active">Active</option>
              <option value="maintenance">Maintenance</option>
              <option value="inactive">Inactive</option>
            </select>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                onClick={() => setEditingModule(null)}
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
                onClick={saveModule}
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

export default BusinessModule;
