import React, { useState } from "react";
import { useThemeValues } from "../Theme/Theme";

const ManageSubAdmins = () => {
  const theme = useThemeValues();

  const [subAdmins, setSubAdmins] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", status: "active", created: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "active", created: "2024-01-10" },
    { id: 3, name: "Bob Wilson", email: "bob@example.com", status: "inactive", created: "2024-01-05" },
  ]);

  const [editingAdmin, setEditingAdmin] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });

  const toggleStatus = (id) => {
    setSubAdmins((prev) =>
      prev.map((admin) =>
        admin.id === id
          ? { ...admin, status: admin.status === "active" ? "inactive" : "active" }
          : admin
      )
    );
  };

  const deleteSubAdmin = (id) => {
    if (window.confirm("Are you sure you want to delete this sub-admin?")) {
      setSubAdmins((prev) => prev.filter((admin) => admin.id !== id));
    }
  };

  const openEdit = (admin) => {
    setEditingAdmin(admin);
    setFormData({ name: admin.name, email: admin.email });
  };

  const updateSubAdmin = () => {
    setSubAdmins((prev) =>
      prev.map((admin) =>
        admin.id === editingAdmin.id
          ? { ...admin, ...formData }
          : admin
      )
    );
    setEditingAdmin(null);
  };

  return (
    <div style={{ padding: "24px", background: theme.palette.bg.body }}>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1
          style={{
            margin: 0,
            color: theme.palette.text.primary,
            ...theme.typography.h1,
          }}
        >
          Manage Sub Admins
        </h1>
        <p style={{ color: theme.palette.text.secondary }}>
          View, update and delete sub-administrators
        </p>
      </div>

      {/* Table */}
      <div
        style={{
          background: theme.palette.bg.card,
          border: `1px solid ${theme.palette.border}`,
          borderRadius: "12px",
          boxShadow: theme.palette.shadow,
          overflowX: "auto",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: theme.palette.bg.header }}>
              {["ID", "Name", "Email", "Status", "Created", "Actions"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "14px",
                    textAlign: "left",
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
            {subAdmins.map((admin) => (
              <tr key={admin.id}>
                <td style={{ padding: "14px", borderBottom: `1px solid ${theme.palette.border}`, color: theme.palette.text.primary }}>
                  {admin.id}
                </td>

                <td style={{ padding: "14px", borderBottom: `1px solid ${theme.palette.border}`, color: theme.palette.text.primary }}>
                  {admin.name}
                </td>

                <td style={{ padding: "14px", borderBottom: `1px solid ${theme.palette.border}`, color: theme.palette.text.primary }}>
                  {admin.email}
                </td>

                <td style={{ padding: "14px", borderBottom: `1px solid ${theme.palette.border}` }}>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "999px",
                      fontSize: "12px",
                      background:
                        admin.status === "active"
                          ? theme.palette.primaryLight
                          : "rgba(148,163,184,0.2)",
                      color:
                        admin.status === "active"
                          ? theme.palette.primary
                          : theme.palette.text.muted,
                    }}
                  >
                    {admin.status}
                  </span>
                </td>

                <td style={{ padding: "14px", borderBottom: `1px solid ${theme.palette.border}`, color: theme.palette.text.primary }}>
                  {admin.created}
                </td>

                <td
                  style={{
                    padding: "14px",
                    borderBottom: `1px solid ${theme.palette.border}`,
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    onClick={() => toggleStatus(admin.id)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "6px",
                      border: `1px solid ${theme.palette.border}`,
                      background: "transparent",
                      color: theme.palette.text.primary,
                      cursor: "pointer",
                    }}
                  >
                    {admin.status === "active" ? "Deactivate" : "Activate"}
                  </button>

                  <button
                    onClick={() => openEdit(admin)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "6px",
                      border: "none",
                      background: theme.palette.primary,
                      color: "#ffffff",
                      cursor: "pointer",
                    }}
                  >
                    Update
                  </button>

                  <button
                    onClick={() => deleteSubAdmin(admin.id)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "6px",
                      border: "none",
                      background: "#ef4444",
                      color: "#ffffff",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* UPDATE MODAL */}
      {editingAdmin && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
          }}
        >
          <div
            style={{
              background: theme.palette.bg.card,
              padding: "24px",
              borderRadius: "12px",
              width: "360px",
              boxShadow: theme.palette.shadowLg,
            }}
          >
            <h3 style={{ marginBottom: "16px", color: theme.palette.text.primary }}>
              Update Sub Admin
            </h3>

            <input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Name"
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

            <input
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Email"
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "16px",
                borderRadius: "6px",
                border: `1px solid ${theme.palette.border}`,
                background: theme.palette.bg.body,
                color: theme.palette.text.primary,
              }}
            />

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                onClick={() => setEditingAdmin(null)}
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
                onClick={updateSubAdmin}
                style={{
                  padding: "8px 14px",
                  borderRadius: "6px",
                  border: "none",
                  background: theme.palette.primary,
                  color: "#ffffff",
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

export default ManageSubAdmins;
