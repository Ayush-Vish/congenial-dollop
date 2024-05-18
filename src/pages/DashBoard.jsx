import { motion } from 'framer-motion';
import AddProductComponent from '../components/AddProductComponent';
import Header from '../components/Header';
import TableSortAndSelection from '../components/Table';

function DashBoard() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className='flex  sm:w-[95%] w-full    h-screen bg-gradient-to-r from-white to-blue-100 flex-col items-center justify-center space-y-8'
    >
      <Header className='w-3/4 bg-white rounded-lg shadow-lg p-4'/>
      <AddProductComponent className='w-3/4 bg-white rounded-lg shadow-lg p-4'/>
      <TableSortAndSelection className='w-3/4 bg-white rounded-lg shadow-lg p-4'/>
    </motion.div>
  );
}

export default DashBoard;