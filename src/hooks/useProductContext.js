import { useContext } from "react";
import { ProductContext } from "../context/product-context";

export function useProductContext() {
  const context = useContext(ProductContext);
  if (context === null) {
    throw new Error(
      "useProductContext must be used within a ProductContextProvider"
    );
  }
  return context;
}
