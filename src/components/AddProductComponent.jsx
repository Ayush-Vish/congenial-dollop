import { Button } from '@mui/material';
import ModalForm from '../pages/ProductPage';
import { useNavigate } from 'react-router';

function AddProductComponent() {
  const navigate = useNavigate() ;

  function handleOnClick() {
    navigate("/product");
    return ;
  }
  return (
    <div className="w-full p-2 flex justify-end">
      <Button  onClick={handleOnClick} variant="contained" color="primary" >
       
          Add Product 
        
      </Button>
    </div>
  );
}

export default AddProductComponent;