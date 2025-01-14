"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

function handleSubmit(formData:FormData) {
  var company_id = Number(formData.get("company_id"));
  var contact_id = formData.get("contact_id");
  console.log(company_id, contact_id);
  fetch(`http://localhost:8000/companies/${company_id}/contacts/${contact_id}`, {
    method: "PUT"
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
}

export default function RegisterContact() {
  const params = useParams();
  const [contact_list, setContactList] = useState([]);
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`http://localhost:8000/contacts?query=list`)
      .then(response => response.json())
      .then(data => {
        setContactList(data);
        setLoading(false);
        console.log("asda")
      });
  }, []);
  
  if(isLoading){
    return (
        <div className='col bg-purple-500 p-10 text-center'>
            <h2>Loading data</h2>
        </div>
    );
  }
  else {
    return (
      <div className='col bg-gray-900 shadow-lg shadow-black rounded-xl col-span-2 p-10 text-orange-500'>
        <form action={handleSubmit}>
          <input type="hidden" name="company_id" value={params.id} />
          <label for="contact_id" className='font-mono text-lg'>Add contact: </label>
          <select name="contact_id" id="contact_id" className="w-96">
            {contact_list.map(contact => (
              <option key={`contact-${contact.id}`} value={contact.id} className="">{contact.name} - {contact.email}</option>
            ))}
          </select>
          <button className='text-orange font-mono rounded-lg text-lg font-bold px-3 ml-10 py-2 bg-gray-800 hover:bg-gray-700 focus:ring-gray-700 border-gray-700' type="submit">Submit</button>
          
        </form>
      </div>
    )
  }
}