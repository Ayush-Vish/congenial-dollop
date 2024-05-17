import React, { useState } from "react";
import { useContext } from "react";

import PropTypes from "prop-types";
const ProductContext = React.createContext();

ProductContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function ProductContextProvider(props) {
  const [products, setProducts] = useState([]);
  async function fetchProducts() {
    const response = await fetch("http://localhost:3001/products");
    if (response.ok) {
      const products = await response.json();
      setProducts(products);
    }
  }
  async function addProduct(product) {
    const response = await fetch("http://localhost:3001/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (response.ok) {
      const newProduct = await response.json();
      setProducts([...products, newProduct]);
    }
      }
      async function deleteProduct(id) {
            const response = await fetch(`http://localhost:3001/products/${id}`, {
            method: "DELETE",
            });
            if (response.ok) {
            setProducts(products.filter((product) => product.id !== id));
            }
            }
            async function updateProduct(product) {
            const response = await fetch(
            `http://localhost:3001/products/${product.id}`,
            {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
            }
            );
            if (response.ok) {

            setProducts(
            products.map((p) => (p.id === product.id ? product : p))
            );
            }
            }

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {props.children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  const context = useContext(ProductContext);
  if (context === null) {
    throw new Error(
      "useProductContext must be used within a ProductContextProvider"
    );
  }
  return context;
}
