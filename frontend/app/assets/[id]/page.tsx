import VendorInfo from './vendorInfo';

export default function Page() {
  return (
    <div  className='grid grid-flow-row auto-rows-max px-52 space-y-10'
          key='VendorPanel' >

        <VendorInfo />
    </div>
  )
}