import React, { useState } from "react";
import { useThemeValues } from "../Theme/Theme";

const Invoices = () => {
  const theme = useThemeValues();

  const [invoices] = useState([
    { id: "INV-001", customer: "John Doe", amount: "$199.99", date: "2024-01-15", status: "paid" },
    { id: "INV-002", customer: "Acme Corp", amount: "$999.99", date: "2024-01-14", status: "pending" },
    { id: "INV-003", customer: "Jane Smith", amount: "$299.99", date: "2024-01-13", status: "paid" },
    { id: "INV-004", customer: "Tech Solutions", amount: "$499.99", date: "2024-01-12", status: "overdue" },
  ]);

  const statusStyle = (status) => {
    switch (status) {
      case "paid":
        return { color: "#22c55e", bg: "#22c55e20" };
      case "pending":
        return { color: "#f59e0b", bg: "#f59e0b20" };
      case "overdue":
        return { color: "#ef4444", bg: "#ef444420" };
      default:
        return {};
    }
  };

  return (
    <div style={{ padding: "24px", background: theme.palette.bg.body }}>
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <div>
          <h1 style={{ margin: 0, color: theme.palette.text.primary }}>
            Invoice Management
          </h1>
          <p style={{ color: theme.palette.text.secondary }}>
            Create, send, and track invoices
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
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
            + Create Invoice
          </button>

          <button
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              border: `1px solid ${theme.palette.border}`,
              background: "transparent",
              color: theme.palette.text.primary,
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Export Invoices
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div
        style={{
          background: theme.palette.bg.card,
          border: `1px solid ${theme.palette.border}`,
          borderRadius: "14px",
          overflowX: "auto",
          boxShadow: theme.palette.shadow,
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "700px",
          }}
        >
          <thead>
            <tr style={{ background: theme.palette.bg.muted }}>
              {["Invoice ID", "Customer", "Amount", "Date", "Status", "Actions"].map(
                (head) => (
                  <th
                    key={head}
                    style={{
                      padding: "14px",
                      textAlign: "left",
                      fontSize: "13px",
                      color: theme.palette.text.secondary,
                      borderBottom: `1px solid ${theme.palette.border}`,
                    }}
                  >
                    {head}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {invoices.map((invoice) => {
              const status = statusStyle(invoice.status);

              return (
                <tr key={invoice.id}>
                  <td style={cellStyle(theme)}>{invoice.id}</td>
                  <td style={cellStyle(theme)}>{invoice.customer}</td>
                  <td style={cellStyle(theme)}>{invoice.amount}</td>
                  <td style={cellStyle(theme)}>{invoice.date}</td>

                  <td style={cellStyle(theme)}>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "999px",
                        fontSize: "12px",
                        background: status.bg,
                        color: status.color,
                        textTransform: "capitalize",
                      }}
                    >
                      {invoice.status}
                    </span>
                  </td>

                  <td style={{ ...cellStyle(theme), display: "flex", gap: "8px" }}>
                    <ActionButton theme={theme} label="View" />
                    <ActionButton theme={theme} label="Download" />

                    {invoice.status === "pending" && (
                      <ActionButton
                        theme={theme}
                        label="Mark Paid"
                        primary
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* REUSABLE STYLES */
const cellStyle = (theme) => ({
  padding: "14px",
  fontSize: "13px",
  color: theme.palette.text.primary,
  borderBottom: `1px solid ${theme.palette.border}`,
});

const ActionButton = ({ label, primary, theme }) => (
  <button
    style={{
      padding: "6px 10px",
      borderRadius: "6px",
      border: primary ? "none" : `1px solid ${theme.palette.border}`,
      background: primary ? theme.palette.primary : "transparent",
      color: primary ? "#fff" : theme.palette.text.primary,
      fontSize: "12px",
      cursor: "pointer",
      whiteSpace: "nowrap",
    }}
  >
    {label}
  </button>
);

export default Invoices;
