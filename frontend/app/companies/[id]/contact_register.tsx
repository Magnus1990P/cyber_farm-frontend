"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Contact } from '@/app/lib/contact';

function handleSubmit(formData:FormData) {
    const company_id = Number(formData.get("company_id"));
    const contact_id = formData.get("contact_id");
    
    fetch(`http://localhost:8000/companies/${company_id}/contacts/${contact_id}`, {
      method: "PUT"
    })
    .then(response => {
        if(response.ok){ return response.json(); }
        else{ throw new Error("Failed query", {cause: response}); }
    })
    .then(data => {
      alert("Added contact to company");
      console.log(data);
    })
    .catch(function(err) {
      alert("Failed to add contact to company");
      console.log(err);
    });
}

export default function RegisterContact() {
  const params = useParams();
  const [contact_list, setContactList] = useState([]);
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`http://localhost:8000/contacts?query=list`)
    .then(response => {
        if(response.ok){ return response.json(); }
        else{ throw new Error("Failed query", {cause: response}); }
    })
      .then(data => {
        setContactList(data);
        setLoading(false);
      })
      .catch(function(err) {
          setLoading(false);
          setContactList([]);
          console.log(err);
      });
  }, []);
  
  if(isLoading){
    return (
        <div className='col bg-purple-500 p-10 text-center'>
            <p className='text-lg text-green-600 font-bold font-mono'>Loading data</p>
        </div>
    );
  }
  else {
    if(contact_list.length > 0){
      return (
        <div className='col bg-gray-900 shadow-lg shadow-black rounded-xl col-span-2 p-5 text-orange-500'>
          <form action={handleSubmit}>
            <button className='text-orange font-mono rounded-lg font-bold px-5 mr-5 py-2 bg-gray-800 hover:bg-gray-700 focus:ring-gray-700 border-gray-700' type="submit">Add contact</button>
            <input type="hidden" name="company_id" value={params.id} />
            <select name="contact_id" id="contact_id" className="w-96 text-black p-1">
              {(contact_list as Contact[]).map((contact:Contact) => (
                <option key={`contact-${contact.id}`} value={contact.id} className="">{contact.name} - {contact.email}</option>
              ))}
            </select>
            
          </form>
        </div>
      )
    }
    else{
      return (
        <div className='col bg-gray-900 shadow-lg shadow-black rounded-xl col-span-2 p-5 text-orange-500'>
          <p className='text-lg text-blue-600 font-bold font-mono'>No contacts loaded</p>
        </div>
      )
    }
  }
}