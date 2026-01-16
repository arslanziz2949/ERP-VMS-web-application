import React, { useState } from "react";
import { useThemeValues } from "../Theme/Theme";

const Clients = () => {
    const theme = useThemeValues();

    const [clients] = useState([
        { id: 1, name: "John Doe", company: "Tech Corp", email: "john@tech.com", status: "active", joined: "2024-01-10" },
        { id: 2, name: "Sarah Smith", company: "Acme Ltd", email: "sarah@acme.com", status: "inactive", joined: "2023-12-20" },
        { id: 3, name: "Michael Lee", company: "CloudNet", email: "mike@cloudnet.com", status: "active", joined: "2024-01-05" },
        { id: 4, name: "Emma Wilson", company: "SecureIT", email: "emma@secureit.com", status: "pending", joined: "2024-01-14" },
    ]);

    return (
        <div style={{ padding: "24px", background: theme.palette.bg.body }}>
            {/* HEADER */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
                <div>
                    <h1 style={{ margin: 0, color: theme.palette.text.primary }}>
                        Client Management
                    </h1>
                    <p style={{ color: theme.palette.text.secondary }}>
                        Manage your clients, accounts, and activity
                    </p>
                </div>

                <button
                    style={{
                        padding: "10px 18px",
                        borderRadius: "8px",
                        border: "none",
                        background: theme.palette.primary,
                        color: "#fff",
                        cursor: "pointer",
                        fontWeight: 600,
                    }}
                >
                    + Add Client
                </button>
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
                    { label: "Total Clients", value: "128" },
                    { label: "Active Clients", value: "96" },
                    { label: "Pending Approval", value: "12" },
                ].map((stat, i) => (
                    <div
                        key={i}
                        style={{
                            background: theme.palette.bg.card,
                            border: `1px solid ${theme.palette.border}`,
                            borderRadius: "14px",
                            padding: "18px",
                        }}
                    >
                        <p style={{ margin: 0, color: theme.palette.text.secondary }}>
                            {stat.label}
                        </p>
                        <h2 style={{ margin: "6px 0", color: theme.palette.text.primary }}>
                            {stat.value}
                        </h2>
                    </div>
                ))}
            </div>

            {/* CLIENT CARDS */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                    gap: "16px",
                }}
            >
                {clients.map((client) => (
                    <div
                        key={client.id}
                        style={{
                            background: theme.palette.bg.card,
                            border: `1px solid ${theme.palette.border}`,
                            borderRadius: "16px",
                            padding: "18px",
                            transition: "0.2s",
                        }}
                    >
                        {/* Avatar */}
                        <div
                            style={{
                                width: "48px",
                                height: "48px",
                                borderRadius: "50%",
                                background: theme.palette.primary,
                                color: "#fff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: 700,
                                marginBottom: "12px",
                            }}
                        >
                            {client.name.charAt(0)}
                        </div>

                        <h3 style={{ margin: "0 0 4px", color: theme.palette.text.primary }}>
                            {client.name}
                        </h3>
                        <p style={{ margin: "0 0 8px", fontSize: "13px", color: theme.palette.text.secondary }}>
                            {client.company}
                        </p>
                        <p style={{ margin: "0 0 12px", fontSize: "13px" }}>
                            📧 {client.email}
                        </p>

                        <span
                            style={{
                                display: "inline-block",
                                padding: "4px 10px",
                                borderRadius: "999px",
                                fontSize: "12px",
                                background:
                                    client.status === "active"
                                        ? "#22c55e20"
                                        : client.status === "pending"
                                            ? "#f59e0b20"
                                            : "#ef444420",
                                color:
                                    client.status === "active"
                                        ? "#22c55e"
                                        : client.status === "pending"
                                            ? "#f59e0b"
                                            : "#ef4444",
                                marginBottom: "14px",
                            }}
                        >
                            {client.status}
                        </span>

                        <p style={{ fontSize: "12px", color: theme.palette.text.muted }}>
                            Joined: {client.joined}
                        </p>

                        {/* ACTIONS */}
                        <div style={{ display: "flex", gap: "8px", marginTop: "14px" }}>
                            <button
                                style={{
                                    flex: 1,
                                    padding: "8px",
                                    borderRadius: "6px",
                                    border: `1px solid ${theme.palette.border}`,
                                    background: "transparent",
                                    cursor: "pointer",
                                }}
                            >
                                View
                            </button>
                            <button
                                style={{
                                    flex: 1,
                                    padding: "8px",
                                    borderRadius: "6px",
                                    border: "none",
                                    background: theme.palette.primary,
                                    color: "#fff",
                                    cursor: "pointer",
                                }}
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Clients;
