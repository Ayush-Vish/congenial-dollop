import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import {} from 'prop-types';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


ModalForm.pr

export default function ModalForm( {productToEdit , children}  ) {
  const [open, setOpen] = React.useState(false);
  const [product, setProduct] = React.useState({
    title: '',
    images: [],
    price: '',
    rating: '',
    category: '',
  });
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
    // Handle form submission here
  };
  React.useEffect(() => {
    if(productToEdit) {
      setProduct(productToEdit);
    }
  }, [ ])

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
            {productToEdit ?  "Edit" : "Add "} Product
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              name="title"
              label="Title"
              value={product.title}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="images"
              label="Images (comma-separated URLs)"
              value={product.image}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
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
            <TextField
              name="category"
              label="Category"
              value={product.category}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button type="submit">Submit</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}