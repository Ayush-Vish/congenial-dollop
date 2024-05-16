import React from "react";
import { useContext } from "react";

import PropTypes from 'prop-types';
const ProductContext = React.createContext();

 

ProductContextProvider.propTypes = {
      children: PropTypes.node.isRequired,
};


export default function ProductContextProvider(props) {
      return (
            <ProductContext.Provider  value={{}}  >
                  {props.children  }
            </ProductContext.Provider>
      );
}

export function useProductContext() {
      const context= useContext(ProductContext);
      if(context === null ) {
            throw new Error("useProductContext must be used within a ProductContextProvider");
      }
      return context;

}