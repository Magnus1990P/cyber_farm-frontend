"use client";
import { useFormStatus } from "react-dom";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

function handleSubmit(formData:FormData) {
  var vendor_id = Number(formData.get("vendor_id"));
  var product_name = formData.get("name");
  console.log(vendor_id, product_name);
  fetch(`http://localhost:8000/vendors/${vendor_id}/products?product_name=${product_name}`, {
    method: "POST"
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      
    });
}

export default function NewProduct() {
  const params = useParams();
  const { pending } = useFormStatus();
  
  return (
    <div className='col bg-gray-900 shadow-lg shadow-black rounded-xl col-span-2 p-10 text-orange-500'>
      <p className='font-mono text-lg'>Register product</p>
        <form action={handleSubmit}>
          <input type="hidden" name="vendor_id" value={params.id} />
          <input className='font-mono text-lg text-lime-400 bg-gray-800 w-80' name="name" type="text" placeholder='Product name' />
          <button disabled={pending} className='text-orange font-mono rounded-lg text-lg font-bold px-5 ml-10 py-2.5 bg-gray-800 hover:bg-gray-700 focus:ring-gray-700 border-gray-700' type="submit">{pending ? "Submitting..." : "Submit"}</button>
        </form>
    </div>
  )
}
