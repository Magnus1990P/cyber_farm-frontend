"use client";

import { useFormStatus } from "react-dom";

function handleSubmit(formData:FormData) {
  fetch(`http://${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/companies`, {
    method: "POST",
    body: JSON.stringify(formData)
  })
    .then(response => {
        if(response.ok){ return response.json(); }
        else{ throw new Error("Failed query", {cause: response}); }
    })
    .then(data => {
        alert("Successfully created object");
        console.log(data);
    })
    .catch(function(err) {
        console.log(err);
    });
}

export default function NewCompany() {
  const { pending } = useFormStatus();
  
  return (
    <div className='col bg-gray-900 mx-auto w-3/4 mb-5 shadow-lg shadow-black rounded-xl p-5 text-orange-500'>
      <p className='font-mono text-lg'></p>
        <form action={handleSubmit}
          className='grid justify-center auto-rows-auto md:grid-cols-3 mx-5 gap-5' >
          <input className='font-mono col-span-2 text-lg text-lime-400 bg-gray-800 w-fill' name="name" type="text" placeholder='Organization name' />
          <input className='font-mono text-lg text-lime-400 bg-gray-800 w-fill' name="short_name" type="text" placeholder='Short Name' />
          <input className='font-mono text-lg text-lime-400 bg-gray-800 w-fill ' name="ekultur_id" type="text" placeholder='eKulturID' />
          <input className='font-mono text-lg text-lime-400 bg-gray-800 w-fill ' name="ekultur_id" type="text" placeholder='eKulturID' />
          <input className='font-mono text-lg text-lime-400 bg-gray-800 w-fill' name="organization_number" type="text" placeholder='Organization number' />
          <button 
            disabled={pending}
            className='text-orange col-span-3 font-mono w-fill rounded-lg text-lg font-bold px-5 py-2.5 bg-gray-800 hover:bg-gray-700 focus:ring-gray-700 border-gray-700'
            type="submit">{pending ? "Registering..." : "Register Company"}</button>
        </form>
    </div>
  )
}
