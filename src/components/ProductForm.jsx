import { Typography } from "@mui/joy";
import { Grid, TextField } from "@mui/material";
import PropTypes from "prop-types";

export default function ProductForm({ product, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
       
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
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="stock"
            label="Stock"
            value={product.stock}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
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
      </Grid>
    </form>
  );
}

ProductForm.propTypes = {
  product: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
