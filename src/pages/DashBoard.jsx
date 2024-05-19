
import React from 'react';
import { motion } from 'framer-motion';
import AddProductComponent from '../components/AddProductComponent';
import Header from '../components/Header';
import TableSortAndSelection from '../components/Table';

function DashBoard() {
  return (
    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}

      className='  sm:w-[95%] w-full absolute     h-screen bg-gradient-to-r from-white to-blue-100 flex-col items-center justify-center space-y-8'
    >
      <Header role="header"  />
      <AddProductComponent data-testid='add-product-component'/>
      <TableSortAndSelection data-testid='table' />
    </motion.div>
  );
}

export default DashBoard;