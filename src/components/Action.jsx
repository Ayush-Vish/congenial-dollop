import * as React from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router";
import { useProductContext } from "../hooks/useProductContext";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

export default function Action({ product }) {
  const { deleteProduct } = useProductContext();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleEdit = () => {
    navigate("product", { state: product });
  };

  const handleDelete = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    deleteProduct(product.id);
    setOpen(false);
  };

  return (
    <div className="flex">
      <IconButton onClick={handleEdit}>
        <EditIcon />
      </IconButton>

      <IconButton onClick={handleDelete}>
        <DeleteIcon color="error" />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          {"Confirm Delete"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}