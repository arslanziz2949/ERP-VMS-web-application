import React, { useState } from "react";
import { useThemeValues } from "../Theme/Theme";

const Products = () => {
  const theme = useThemeValues();

  const [products, setProducts] = useState([
    { id: 1, name: "Home Security Camera", category: "Cameras", price: 199.99, stock: 150, status: "active" },
    { id: 2, name: "Smart Door Lock", category: "Security", price: 299.99, stock: 89, status: "active" },
    { id: 3, name: "Wi-Fi Mesh System", category: "Networking", price: 399.99, stock: 0, status: "out_of_stock" },
  ]);

  const categories = ["All", "Cameras", "Security", "Networking", "Accessories"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

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
            Product Management
          </h1>
          <p style={{ color: theme.palette.text.secondary }}>
            Manage all products in your catalog
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
          + Add Product
        </button>
      </div>

      {/* CATEGORY FILTERS */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "24px", flexWrap: "wrap" }}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: "8px 14px",
              borderRadius: "999px",
              border: `1px solid ${theme.palette.border}`,
              background:
                selectedCategory === category
                  ? theme.palette.primary
                  : theme.palette.bg.card,
              color:
                selectedCategory === category
                  ? "#fff"
                  : theme.palette.text.primary,
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 500,
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* PRODUCTS GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredProducts.map((product) => (
          <div
            key={product.id}
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
            {/* IMAGE PLACEHOLDER */}
            <div
              style={{
                height: "140px",
                borderRadius: "10px",
                background: theme.palette.primaryLight,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
                fontWeight: 700,
                color: theme.palette.primary,
                marginBottom: "12px",
              }}
            >
              {product.name.charAt(0)}
            </div>

            {/* INFO */}
            <div style={{ marginBottom: "12px" }}>
              <h3
                style={{
                  margin: "0 0 4px",
                  fontSize: "16px",
                  color: theme.palette.text.primary,
                }}
              >
                {product.name}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "13px",
                  color: theme.palette.text.secondary,
                }}
              >
                {product.category}
              </p>
            </div>

            {/* DETAILS */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "14px",
              }}
            >
              <span
                style={{
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                }}
              >
                ${product.price.toFixed(2)}
              </span>

              <span
                style={{
                  fontSize: "12px",
                  padding: "4px 10px",
                  borderRadius: "999px",
                  background:
                    product.status === "out_of_stock"
                      ? "rgba(239,68,68,0.15)"
                      : theme.palette.primaryLight,
                  color:
                    product.status === "out_of_stock"
                      ? "#ef4444"
                      : theme.palette.primary,
                }}
              >
                {product.status === "out_of_stock"
                  ? "Out of stock"
                  : `${product.stock} in stock`}
              </span>
            </div>

            {/* ACTIONS */}
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                style={{
                  flex: 1,
                  padding: "8px",
                  borderRadius: "6px",
                  border: `1px solid ${theme.palette.border}`,
                  background: "transparent",
                  color: theme.palette.text.primary,
                  cursor: "pointer",
                }}
              >
                Edit
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
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
