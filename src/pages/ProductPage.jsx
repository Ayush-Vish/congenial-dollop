import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import { Grid, Skeleton } from "@mui/material";
import { useProductContext } from "../hooks/useProductContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation } from "react-router";
import ProductForm from "../components/ProductForm";
import ProductImage from "../components/ui/ProductImage";
import {motion} from "framer-motion"
export default function ProductPage({ children }) {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const { addProduct, updateProduct, products } = useProductContext();
  const { state } = useLocation();
  console.log(state);
  const [product, setProduct] = React.useState({
    id: "",
    title: "",
    image: "",
    description: "",
    price: "",
    rating: "",
    category: "",
    discountPercentage: "",
    stock: "",
    thumbnail: "",
    images: [],
  });

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleChange = (event) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (state) {
      updateProduct(product);
    } else {
      addProduct({ ...product, id: products.length + 1 });
    }
  };

  React.useEffect(() => {
    if (state) {
      setProduct(state);
    }
  }, [state]);

  React.useEffect(() => {
    setImageLoaded(false);
  }, [product.thumbnail]);

  return (
    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
    <Box
    
    sx={{
      padding: 3,
      backgroundColor: "#f5f5f5",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  
      }}
    >
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => window.history.back()}
        sx={{
          marginBottom: 2,
          backgroundColor: "#3f51b5",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#3f51b5", // Keeps the background color the same on hover
            opacity: 1, // Ensures the button doesn't become transparent on hover
          },
        }}
      >
        Back
      </Button>
      <Box
        sx={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px" }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          {state ? "Edit" : "Add "} Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <ProductForm  product={product} handleChange={handleChange} handleSubmit={handleSubmit} />
            <ProductImage imageLoaded={imageLoaded} handleImageLoad={handleImageLoad}  thumbnail={product.thumbnail}/>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
    </motion.div>
  );
}

ProductPage.propTypes = {
  productToEdit: PropTypes.object,
  children: PropTypes.node,
};
