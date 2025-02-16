"use client";
import { useFormStatus } from "react-dom";
import React from 'react';
import { useParams } from 'next/navigation';

function handleSubmit(formData:FormData) {
  const vendor_id = Number(formData.get("vendor_id"));
  const product_name = formData.get("name");
  console.log(vendor_id, product_name);
  fetch(`http://localhost:8000/vendors/${vendor_id}/products?product_name=${product_name}`, {
    method: "POST"
  })
  .then(response => {
      if(response.ok){ return response.json(); }
      else { throw new Error("Failed query", {cause: response}); }
  })
  .then(data => {
      alert("Added product to vendor");
      console.log(data);
  })
  .catch(function(err) {
    alert("Failed to add product to vendor");
    console.log(err);
  });
}

export default function NewProduct() {
  const params = useParams();
  const { pending } = useFormStatus();
  
  return (
    <div className='col bg-gray-900 shadow-lg shadow-black rounded-xl col-span-2 p-5 text-orange-500'>
      <form action={handleSubmit}>
        <button
          disabled={pending}
          className='font-mono rounded-md font-bold px-3 mr-3 py-1 bg-gray-800 hover:bg-orange-500 hover:text-black focus:ring-gray-700 border-gray-700' 
          type="submit">{pending ? "Creating..." : "Create Product"}</button>
        <input type="hidden" name="vendor_id" value={params.id} />
        <input className='font-mono text-lg bg-gray-800 w-72' name="name" type="text" placeholder='Product name' />
      </form>
    </div>
  )
}
