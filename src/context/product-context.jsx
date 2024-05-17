import React, { useState } from "react";

import PropTypes from "prop-types";
import { createData } from "../utils/stableSort";
export const ProductContext = React.createContext(null);

ProductContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
const URL = "http://localhost:3000/products";
export default function ProductContextProvider(props) {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const response = await fetch(URL, {
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    const rows = data.map((product) =>
      createData(
        product.id,
        product.title,
        product.description,
        product.price,
        product.discountPercentage,
        product.rating,
        product.stock,
        product.brand,
        product.category,
        product.thumbnail,
        product.images
      )
    );
    setProducts(rows);
  };
  async function addProduct(product) {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (response.ok) {
      const newProduct = await response.json();
      setProducts([...products, newProduct]);
      return true;
    } else {
      return false;
    }
  }
  async function deleteProduct(id) {
    const response = await fetch(URL + "/" + id, {
      method: "DELETE",
    });
    if (response.ok) {
      setProducts(products.filter((product) => product.id !== id));
      return true;
    } else {
      return false;
    }
  }
  async function updateProduct(product) {
    try {
      const response = await fetch(URL + "/" + product.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        setProducts(products.map((p) => (p.id === product.id ? product : p)));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("An error occurred while updating the product:", error);
    }
  }
  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        fetchProducts,
        updateProduct,
        addProduct,
        deleteProduct,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}
