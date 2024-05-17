import { Button } from '@mui/material';
import ModalForm from './ModalForm';

function AddProductComponent() {
  return (
    <div className="w-full p-2 flex justify-end">
      <Button  variant="contained" color="primary" >
        <ModalForm>
          Add Product 
        </ModalForm>
      </Button>
    </div>
  );
}

export default AddProductComponent;