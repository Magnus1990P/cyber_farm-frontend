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
    <div className='col bg-gray-900 shadow-lg shadow-black rounded-xl col-span-2 p-10 text-orange-500'>
      <p className='font-mono text-lg'>Register product</p>
        <form action={handleSubmit}>
          <input className='font-mono text-lg text-lime-400 bg-gray-800 w-80 ' name="ekultur_id" type="text" placeholder='eKulturID' />
          <input className='font-mono text-lg text-lime-400 bg-gray-800 w-80 ' name="ekultur_id" type="text" placeholder='eKulturID' />
          <input className='font-mono text-lg text-lime-400 bg-gray-800 w-80' name="name" type="text" placeholder='Organization name' />
          <input className='font-mono text-lg text-lime-400 bg-gray-800 w-80' name="short_name" type="text" placeholder='Short Name' />
          <input className='font-mono text-lg text-lime-400 bg-gray-800 w-80' name="organization_number" type="text" placeholder='Organization number' />
          <button 
            disabled={pending}
            className='text-orange font-mono rounded-lg text-lg font-bold px-5 ml-10 py-2.5 bg-gray-800 hover:bg-gray-700 focus:ring-gray-700 border-gray-700'
            type="submit">{pending ? "Submitting..." : "Submit"}</button>
        </form>
    </div>
  )
}
