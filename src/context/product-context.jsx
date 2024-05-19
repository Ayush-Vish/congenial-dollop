import React, { useState } from "react";
import PropTypes from "prop-types";
import { createData } from "../utils/stableSort";
import { Snackbar, Alert } from "@mui/material";

export const ProductContext = React.createContext(null);

ProductContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const URL = "http://localhost:3000/products";

export default function ProductContextProvider(props) {
  const [products, setProducts] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const fetchProducts = async () => {
    try {
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
    } catch (error) {
      setSnackbar({ open: true, message: "Failed to fetch products", severity: "error" });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  async function addProduct(product) {
    try {
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
        setSnackbar({ open: true, message: "Product added successfully", severity: "success" });
        return true;
      } else {
        setSnackbar({ open: true, message: "Failed to add product", severity: "error" });
        return false;
      }
    } catch (error) {
      setSnackbar({ open: true, message: "An error occurred while adding the product", severity: "error" });
      return false;
    }
  }

  async function deleteProduct(id) {
    try {
      const response = await fetch(URL + "/" + id, {
        method: "DELETE",
      });
      if (response.ok) {
        setProducts(products.filter((product) => product.id !== id));
        setSnackbar({ open: true, message: "Product deleted successfully", severity: "success" });
        return true;
      } else {
        setSnackbar({ open: true, message: "Failed to delete product", severity: "error" });
        return false;
      }
    } catch (error) {
      setSnackbar({ open: true, message: "An error occurred while deleting the product", severity: "error" });
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
        setSnackbar({ open: true, message: "Product updated successfully", severity: "success" });
        return true;
      } else {
        setSnackbar({ open: true, message: "Failed to update product", severity: "error" });
        return false;
      }
    } catch (error) {
      setSnackbar({ open: true, message: "An error occurred while updating the product", severity: "error" });
      return false;
    }
  }
  async function deleteMany(productNames) {
    try {
      console.log(productNames)
      const deletePromises = productNames.map(productName => {
        console.log(productNames)
        const product = products.find(p => p.title === productName);
        console.log(product)
        return deleteProduct(product.id);
      });
  
      await Promise.all(deletePromises);
  
      setSnackbar({open : true , message : "Products deleted successfully"});
    } catch (error) {
      setSnackbar({open : true , message : "An error occured while deleting"});
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
        deleteMany
      }}
    >
      {props.children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ProductContext.Provider>
  );
}
