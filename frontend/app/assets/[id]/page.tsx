import VendorInfo from './vendorInfo';

export default function Page() {
  return (
    <div  className='grid grid-cols-5 mx-20'
          key='VendorPanel' >
        <VendorInfo />
    </div>
  )
}