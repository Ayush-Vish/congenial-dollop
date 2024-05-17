import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import PropType from "prop-types";
import { Grid, Skeleton } from "@mui/joy";
import { useProductContext } from "../hooks/useProductContext";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalForm({ productToEdit, children }) {
  const [open, setOpen] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const { addProduct, updateProduct } = useProductContext();

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
  console.log(product);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  console.log(product);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (productToEdit) {
      updateProduct(product);
      
    } else {
      addProduct(product);
    }
  };
  React.useEffect(() => {
    if (productToEdit) {
      setProduct(productToEdit);
    }
  }, [productToEdit]);
  React.useEffect(() => {
    setImageLoaded(false);
  }, [product.thumbnail]);

  return (
    <div>
      <div onClick={handleOpen}>{children}</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {productToEdit ? "Edit" : "Add "} Product
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">Product Details</Typography>
              </Grid>
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
                <TextField
                  name="image"
                  label="Image"
                  value={product.thumbnail}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                />
                {product.thumbnail ? (
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
                      }}
                    />
                  </>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <Button type="submit">Submit</Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
