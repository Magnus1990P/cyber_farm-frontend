"use client";

import React from 'react';
import { useFormStatus } from "react-dom";


function handleSubmit(formData:FormData) {
  const vendor_name = formData.get("name");
  fetch(`http://$${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/vendors/?name=${vendor_name}`, {
    method: "POST"
  })
  .then(response => {
      if(response.ok){ return response.json(); }
      else { throw new Error("Failed query", {cause: response}); }
  })
  .then(data => {
      alert("Created vendor");
      console.log(data);
  })
  .catch(function(err) {
    alert("Failed to create vendor");
    console.log(err);
  });
}

export function NewVendor() {
  const { pending } = useFormStatus();
  
  return (
    <div className='bg-gray-700 shadow-lg m-5 shadow-black rounded-xl p-5 text-orange-500'>
      <form action={handleSubmit}>
        <button
          disabled={pending}
          className='font-mono rounded-md font-bold px-3 mr-3 py-1 bg-gray-800 hover:bg-orange-500 hover:text-black focus:ring-gray-700 border-gray-700' 
          type="submit">{pending ? "Creating..." : "Create New  Vendor"}</button>
        <input className='font-mono p-1 rounded-md bg-gray-800 w-72' name="name" type="text" placeholder='Vendor name' />
      </form>
    </div>
  )
}
