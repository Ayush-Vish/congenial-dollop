
import AddProductComponent from '../components/AddProductComponent'
import Header from '../components/Header'
import TableSortAndSelection from '../components/Table'

function DashBoard() {
  return (
    <div className='flex w-[90%] bg-red-200  flex-col  '  >
      <Header/>
      <AddProductComponent/>
      <TableSortAndSelection/>
    </div>
  )
}

export default DashBoard
