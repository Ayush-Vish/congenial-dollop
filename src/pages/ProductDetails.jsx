import { Box, Typography, Grid } from "@mui/material";

import { useEffect } from "react";
import { useLocation } from "react-router";
import { motion } from "framer-motion";

export default function ProductDetails() {
  const { state: product } = useLocation();
  console.log(product);

  useEffect(() => {
    if (!product) {
      window.history.back();
    }
  }, [product]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ padding: '20px' }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              component="img"
              src={product.thumbnail}
              alt={product.title}
              sx={{ width: '100%', borderRadius: '8px', boxShadow: 3 }}
            />
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
              {product.title}
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ color: 'green' }}>
              ${product.price}
            </Typography>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Discount: {product.discountPercentage}%
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Rating: {product.rating}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Stock: {product.stock}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Brand: {product.brand}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Category: {product.category}
            </Typography>
          </motion.div>
        </Grid>
      </Grid>
    </motion.div>
  );
}

