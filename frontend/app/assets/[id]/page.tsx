"use client"

import { useParams } from 'next/navigation'
import {VendorInfo} from '@/app/lib/asset'
 
export default function ExampleClientComponent() {
  const params = useParams()
 
  console.log(params)
 
  return(
    <>
      <div  className='flex-grid bg-gray-500 p-10 grid-cols-1 space-y-4 justify-center'
            key='VendorPanel' >
        <div  className='col bg-orange-400 p-10 rounded-2xl text-center'
              key='VendorPanel' >
          <p>Vendor information</p>
          <VendorInfo vendor_id={params.id}></VendorInfo>
        </div>
        <div  className='col bg-lime-400 p-10 text-center'
              key='ProductList' >
          <p>Products are listed, alogn with organizations using it</p>
        </div>
      </div>
    </>
  )
}