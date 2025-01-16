import VendorInfo from './vendorInfo';

export default function Page() {
  return (
    <div  className='grid grid-cols-4 space-x-5 mx-10'
          key='VendorPanel' >
        <VendorInfo />
    </div>
  )
}