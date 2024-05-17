import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalForm from './ModalForm';

export default function Action({ product }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className='flex '  >
      <ModalForm     open={open} handleClose={handleClose} productToEdit={product} >
        <IconButton onClick={handleOpen}>
          <EditIcon />
        </IconButton>

      </ModalForm>
      <IconButton>
        <DeleteIcon color='error' />
      </IconButton>
    </div>
  );
}