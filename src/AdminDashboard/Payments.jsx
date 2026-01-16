import React, { useState } from "react";
import { useThemeValues } from "../Theme/Theme";

const Payments = () => {
  const theme = useThemeValues();

  const [payments] = useState([
    { id: 1, transactionId: "TXN-001", customer: "John Doe", amount: "$199.99", method: "Credit Card", date: "2024-01-15", status: "completed" },
    { id: 2, transactionId: "TXN-002", customer: "Acme Corp", amount: "$999.99", method: "Bank Transfer", date: "2024-01-14", status: "pending" },
    { id: 3, transactionId: "TXN-003", customer: "Jane Smith", amount: "$299.99", method: "PayPal", date: "2024-01-13", status: "completed" },
    { id: 4, transactionId: "TXN-004", customer: "Tech Solutions", amount: "$499.99", method: "Credit Card", date: "2024-01-12", status: "failed" },
  ]);

  return (
    <div style={{ padding: "24px", background: theme.palette.bg.body }}>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h1 style={{ margin: 0, color: theme.palette.text.primary }}>
            Payment Management
          </h1>
          <p style={{ color: theme.palette.text.secondary }}>
            Track and manage all payment transactions
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
            Process Refund
          </button>

          <button
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              border: `1px solid ${theme.palette.border}`,
              background: "transparent",
              color: theme.palette.text.primary,
              cursor: "pointer",
            }}
          >
            View Reports
          </button>
        </div>
      </div>

      {/* STATS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {[
          { title: "Total Revenue", value: "$1,999.96", sub: "This month" },
          { title: "Pending Payments", value: "$999.99", sub: "Awaiting clearance" },
          { title: "Successful Transactions", value: "45", sub: "This month" },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              background: theme.palette.bg.card,
              border: `1px solid ${theme.palette.border}`,
              borderRadius: "14px",
              padding: "18px",
              boxShadow: theme.palette.shadow,
            }}
          >
            <p style={{ margin: 0, color: theme.palette.text.secondary }}>
              {stat.title}
            </p>
            <h2 style={{ margin: "6px 0", color: theme.palette.text.primary }}>
              {stat.value}
            </h2>
            <p style={{ margin: 0, fontSize: "12px", color: theme.palette.text.muted }}>
              {stat.sub}
            </p>
          </div>
        ))}
      </div>

      {/* TABLE */}
      <div
        style={{
          background: theme.palette.bg.card,
          border: `1px solid ${theme.palette.border}`,
          borderRadius: "14px",
          overflowX: "auto",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "900px" }}>
          <thead>
            <tr style={{ background: theme.palette.bg.muted }}>
              {["Transaction ID", "Customer", "Amount", "Method", "Date", "Status", "Actions"].map(h => (
                <th
                  key={h}
                  style={{
                    padding: "14px",
                    textAlign: "left",
                    fontSize: "13px",
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
            {payments.map(p => (
              <tr key={p.id}>
                <td style={{ padding: "14px", borderBottom: `1px solid ${theme.palette.border}` }}>{p.transactionId}</td>
                <td style={{ padding: "14px", borderBottom: `1px solid ${theme.palette.border}` }}>{p.customer}</td>
                <td style={{ padding: "14px", borderBottom: `1px solid ${theme.palette.border}` }}>{p.amount}</td>
                <td style={{ padding: "14px", borderBottom: `1px solid ${theme.palette.border}` }}>{p.method}</td>
                <td style={{ padding: "14px", borderBottom: `1px solid ${theme.palette.border}` }}>{p.date}</td>

                <td style={{ padding: "14px", borderBottom: `1px solid ${theme.palette.border}` }}>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "999px",
                      fontSize: "12px",
                      background:
                        p.status === "completed"
                          ? "#22c55e20"
                          : p.status === "pending"
                          ? "#f59e0b20"
                          : "#ef444420",
                      color:
                        p.status === "completed"
                          ? "#22c55e"
                          : p.status === "pending"
                          ? "#f59e0b"
                          : "#ef4444",
                    }}
                  >
                    {p.status}
                  </span>
                </td>

                <td
                  style={{
                    padding: "14px",
                    borderBottom: `1px solid ${theme.palette.border}`,
                    display: "flex",
                    gap: "8px",
                  }}
                >
                  <button
                    style={{
                      padding: "6px 10px",
                      borderRadius: "6px",
                      border: `1px solid ${theme.palette.border}`,
                      background: "transparent",
                      cursor: "pointer",
                    }}
                  >
                    View Details
                  </button>

                  {p.status === "pending" && (
                    <button
                      style={{
                        padding: "6px 10px",
                        borderRadius: "6px",
                        border: "none",
                        background: theme.palette.primary,
                        color: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
