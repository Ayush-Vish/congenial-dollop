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
    <div className=" flex justify-end w-3/4 bg-white rounded-lg shadow-lg p-4 mt-[10%]">
      <Button  onClick={handleOnClick} variant="contained" color="primary" >
       
          Add Product 
        
      </Button>
    </div>
  );
}

export default AddProductComponent;