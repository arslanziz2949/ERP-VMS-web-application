import React, { useState } from "react";
import { useThemeValues } from "../Theme/Theme";

const DevicesCams = () => {
  const theme = useThemeValues();

  const [devices] = useState([
    { id: 1, name: "Front Door Camera", type: "Camera", status: "online", location: "Main Entrance", lastActive: "2 mins ago" },
    { id: 2, name: "Backyard Camera", type: "Camera", status: "offline", location: "Backyard", lastActive: "1 hour ago" },
    { id: 3, name: "Office Router", type: "Network", status: "online", location: "Main Office", lastActive: "Now" },
    { id: 4, name: "Server Rack", type: "Server", status: "maintenance", location: "Data Center", lastActive: "5 mins ago" },
  ]);

  const deviceTypes = ["All", "Camera", "Network", "Server", "Sensor"];
  const [selectedType, setSelectedType] = useState("All");

  const filteredDevices =
    selectedType === "All"
      ? devices
      : devices.filter((d) => d.type === selectedType);

  const getStatusColor = (status) => {
    if (status === "online") return "#22c55e";
    if (status === "offline") return "#ef4444";
    return "#f59e0b";
  };

  const getIcon = (type) => {
    if (type === "Camera") return "📷";
    if (type === "Network") return "📡";
    if (type === "Server") return "🖥️";
    return "🔌";
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
            Devices & Cameras
          </h1>
          <p style={{ color: theme.palette.text.secondary }}>
            Monitor and manage all connected devices
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
          + Add Device
        </button>
      </div>

      {/* FILTERS */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "24px", flexWrap: "wrap" }}>
        {deviceTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            style={{
              padding: "8px 14px",
              borderRadius: "999px",
              border: `1px solid ${theme.palette.border}`,
              background:
                selectedType === type
                  ? theme.palette.primary
                  : theme.palette.bg.card,
              color:
                selectedType === type
                  ? "#fff"
                  : theme.palette.text.primary,
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {/* DEVICES GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredDevices.map((device) => (
          <div
            key={device.id}
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
            {/* HEADER */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  background: theme.palette.primaryLight,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  marginRight: "12px",
                }}
              >
                {getIcon(device.type)}
              </div>

              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "15px",
                    color: theme.palette.text.primary,
                  }}
                >
                  {device.name}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: "12px",
                    color: theme.palette.text.secondary,
                  }}
                >
                  {device.type} • {device.location}
                </p>
              </div>

              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "12px",
                  padding: "4px 10px",
                  borderRadius: "999px",
                  background: `${getStatusColor(device.status)}20`,
                  color: getStatusColor(device.status),
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: getStatusColor(device.status),
                  }}
                />
                {device.status}
              </span>
            </div>

            {/* BODY */}
            <div style={{ fontSize: "13px", color: theme.palette.text.secondary }}>
              <p style={{ margin: "4px 0" }}>
                <strong>Last Active:</strong> {device.lastActive}
              </p>
              <p style={{ margin: "4px 0" }}>
                <strong>IP Address:</strong> 192.168.1.{device.id}
              </p>
            </div>

            {/* ACTIONS */}
            <div style={{ display: "flex", gap: "10px", marginTop: "14px" }}>
              {["View Stream", "Configure", "Restart"].map((action) => (
                <button
                  key={action}
                  style={{
                    flex: 1,
                    padding: "8px",
                    borderRadius: "6px",
                    border:
                      action === "Restart"
                        ? "none"
                        : `1px solid ${theme.palette.border}`,
                    background:
                      action === "Restart"
                        ? "#ef4444"
                        : "transparent",
                    color:
                      action === "Restart"
                        ? "#fff"
                        : theme.palette.text.primary,
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DevicesCams;
