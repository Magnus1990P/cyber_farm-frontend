"use client";

import React from 'react';
import { useFormStatus } from "react-dom";
import { useParams } from 'next/navigation';

function handleSubmit(formData:FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  fetch(`http://${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/contacts?name=${name}&email=${email}&phone=${phone}`, {
    method: "POST"
  })
  .then(response => {
      if(response.ok){ return response.json(); }
      else{ throw new Error("Failed query", {cause: response}); }
  })
  .then(data => {
    alert("Added contact");
    console.log(data);
  })
  .catch(function(err) {
    alert("Failed to add contact");
    console.log(err);
  });
}

export default function NewProduct() {
  const params = useParams();
  const { pending } = useFormStatus();
  
  return (
    <div className='col bg-gray-900 mx-auto w-3/4 mb-10 shadow-lg shadow-black rounded-xl col-span-2 p-5 text-orange-500'>
      <p className='font-mono text-xl'>Register new contact</p>
      <form className="" action={handleSubmit}>
        <input className='font-mono text-lg text-lime-400 bg-gray-800 w-80 mr-5' name="name" type="text" placeholder='Name' />
        <input className='font-mono text-lg text-lime-400 bg-gray-800 w-80 mr-5' name="email" type="text" placeholder='Email' />
        <input className='font-mono text-lg text-lime-400 bg-gray-800 w-80' name="phone" type="text" placeholder='Phone (+47)' />
        <button disabled={pending} className='text-orange font-mono rounded-lg text-lg font-bold px-5 ml-10 py-2.5 bg-gray-800 hover:bg-gray-700 focus:ring-gray-700 border-gray-700' type="submit">{pending ? "Submitting..." : "Submit"}</button>
      </form>
    </div>
  )
}
