
import VendorInfo from './vendorInfo';

export default function Page() {
  return (
    <div  className='flex-grid bg-gray-500 p-10 grid-cols-1 space-y-4 justify-center'
          key='VendorPanel' >
        <VendorInfo />
      
      <div  className='col bg-lime-500 p-10 text-center'
            key='ProductList' >
        <p>Products are listed, alogn with organizations using it</p>
      </div>
    </div>
  )
}