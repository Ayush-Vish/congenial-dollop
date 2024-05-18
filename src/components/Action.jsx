import * as React from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalForm from "../pages/ProductPage";
import { useNavigate } from "react-router";

export default function Action({ product }) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("product" , {state : product});

  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="flex ">
      
        <IconButton onClick={handleEdit}>
          <EditIcon />
        </IconButton>

      <IconButton>
        <DeleteIcon color="error" />
      </IconButton>
    </div>
  );
}
