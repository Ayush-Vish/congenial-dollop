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



export default function ProductPage({ children }) {
  
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const { addProduct, updateProduct  , products} = useProductContext();
  const {state}  = useLocation();
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
      addProduct({...product, id :products.length +1  });
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
    <Box sx={{ padding: 3, backgroundColor: '#f5f5f5', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
  <Button
    startIcon={<ArrowBackIcon />}
    onClick={() => window.history.back()}
    sx={{ marginBottom: 2, backgroundColor: '#3f51b5', color: '#fff' }}
  >
    Back
  </Button>
  <Box sx={{  backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}>
    <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
      {state ? "Edit" : "Add "} Product
    </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Product Details</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="title"
                label="Title"
                value={product.title}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="category"
                label="Category"
                value={product.category}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="description"
                label="Description"
                value={product.description}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="discountPercentage"
                label="Discount Percentage"
                value={product.discountPercentage}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="stock"
                label="Stock"
                value={product.stock}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="thumbnail"
                label="Thumbnail"
                value={product.thumbnail}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="price"
                label="Price"
                value={product.price}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                name="rating"
                label="Rating"
                value={product.rating}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              {product.thumbnail && (
                <>
                  {!imageLoaded && (
                    <Skeleton
                      variant="rectangular"
                      width={210}
                      height={118}
                    />
                  )}
                  <img
                    src={product.thumbnail}
                    alt="Product"
                    onLoad={handleImageLoad}
                    style={{
                      width: "210px",
                      height: "118px",
                      display: imageLoaded ? "block" : "none",
                      marginTop: 16,
                    }}
                  />
                </>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
}

ProductPage.propTypes = {
  productToEdit: PropTypes.object,
  children: PropTypes.node,
};
