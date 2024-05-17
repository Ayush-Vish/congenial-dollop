import React from 'react';
import { Button } from '@mui/material';

function AddProductComponent() {
  return (
    <div className="w-full p-2 flex justify-end">
      <Button  variant="contained" color="primary" >
        Add Product
      </Button>
    </div>
  );
}

export default AddProductComponent;