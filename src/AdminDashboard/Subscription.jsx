import React, { useState } from "react";
import { useThemeValues } from "../Theme/Theme";

const Subscription = () => {
  const theme = useThemeValues();
  const [billingType, setBillingType] = useState("Monthly");

  const [subscriptions] = useState([
    { id: 1, plan: "Monthly Basic", price: "$9.99", users: 45, status: "active" },
    { id: 2, plan: "Monthly Pro", price: "$19.99", users: 28, status: "active" },
    { id: 3, plan: "Yearly Basic", price: "$99.99", users: 15, status: "active" },
    { id: 4, plan: "Yearly Pro", price: "$199.99", users: 8, status: "inactive" },
  ]);

  const getStatusColor = (status) =>
    status === "active" ? "#22c55e" : "#ef4444";

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
            Subscription Management
          </h1>
          <p style={{ color: theme.palette.text.secondary }}>
            Manage subscription plans and billing
          </p>
        </div>

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
          + Add Plan
        </button>
      </div>

      {/* PLANS HEADER */}
      <div
        style={{
          background: theme.palette.bg.card,
          border: `1px solid ${theme.palette.border}`,
          borderRadius: "12px",
          padding: "16px",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: 0, color: theme.palette.text.primary }}>
          Subscription Plans
        </h3>

        <div
          style={{
            display: "flex",
            background: theme.palette.bg.muted,
            borderRadius: "999px",
            padding: "4px",
          }}
        >
          {["Monthly", "Yearly"].map((type) => (
            <span
              key={type}
              onClick={() => setBillingType(type)}
              style={{
                padding: "6px 14px",
                cursor: "pointer",
                borderRadius: "999px",
                fontSize: "13px",
                background:
                  billingType === type
                    ? theme.palette.primary
                    : "transparent",
                color:
                  billingType === type
                    ? "#fff"
                    : theme.palette.text.primary,
              }}
            >
              {type}
            </span>
          ))}
        </div>
      </div>

      {/* PLANS GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "20px",
        }}
      >
        {subscriptions
          .filter((p) => p.plan.includes(billingType))
          .map((plan) => (
            <div
              key={plan.id}
              style={{
                background: theme.palette.bg.card,
                border: `1px solid ${theme.palette.border}`,
                borderRadius: "14px",
                padding: "18px",
                boxShadow: theme.palette.shadow,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* PLAN HEADER */}
              <div>
                <h3
                  style={{
                    margin: "0 0 6px",
                    color: theme.palette.text.primary,
                  }}
                >
                  {plan.plan}
                </h3>

                <span
                  style={{
                    fontSize: "22px",
                    fontWeight: 700,
                    color: theme.palette.primary,
                  }}
                >
                  {plan.price}
                </span>
              </div>

              {/* FEATURES */}
              <div
                style={{
                  marginTop: "14px",
                  fontSize: "13px",
                  color: theme.palette.text.secondary,
                }}
              >
                <p>✅ 24/7 Support</p>
                <p>✅ Cloud Storage</p>
                <p>✅ Mobile App Access</p>
                {plan.plan.includes("Pro") && (
                  <p>✅ Premium Features</p>
                )}
              </div>

              {/* STATS */}
              <div style={{ fontSize: "13px", marginTop: "12px" }}>
                <p>
                  <strong>Active Users:</strong> {plan.users}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    style={{
                      padding: "4px 10px",
                      marginLeft: "6px",
                      borderRadius: "999px",
                      background: `${getStatusColor(plan.status)}20`,
                      color: getStatusColor(plan.status),
                      fontSize: "12px",
                    }}
                  >
                    {plan.status}
                  </span>
                </p>
              </div>

              {/* ACTIONS */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "14px",
                }}
              >
                <button
                  style={{
                    flex: 1,
                    padding: "8px",
                    borderRadius: "8px",
                    border: `1px solid ${theme.palette.border}`,
                    background: "transparent",
                    color: theme.palette.text.primary,
                    cursor: "pointer",
                    fontSize: "13px",
                  }}
                >
                  Edit Plan
                </button>

                <button
                  style={{
                    flex: 1,
                    padding: "8px",
                    borderRadius: "8px",
                    border: "none",
                    background: theme.palette.primary,
                    color: "#fff",
                    cursor: "pointer",
                    fontSize: "13px",
                  }}
                >
                  View Users
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Subscription;
