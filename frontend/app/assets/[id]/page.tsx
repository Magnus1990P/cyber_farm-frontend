import VendorInfo from './vendorInfo';
import NewProduct from './product_create';

export default function Page() {
  return (
    <div  className='grid grid-cols-5 mx-10 space-y-10 space-x-5 bg-red-500'
          key='VendorPanel' >
        <NewProduct />
        <VendorInfo />
    </div>
  )
}