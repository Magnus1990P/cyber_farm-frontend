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
    .then(response => {
        if(response.ok){ return response.json(); }
        else{ throw new Error("Failed query", {cause: response}); }
    })
    .then(data => {
      alert("Added contact to company");
    })
    .catch(function(err) {
      alert("Failed to add contact to company");
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
    if(contact_list.length==0){
      return (
        <div className='col bg-gray-900 shadow-lg shadow-black rounded-xl col-span-2 p-5 text-orange-500'>
        </div>
      );
    }
    else{
      return (
        <div className='col bg-gray-900 shadow-lg shadow-black rounded-xl col-span-2 p-5 text-orange-500'>
          <form action={handleSubmit}>
            <button className='text-orange font-mono rounded-lg font-bold px-5 mr-5 py-2 bg-gray-800 hover:bg-gray-700 focus:ring-gray-700 border-gray-700' type="submit">Add contact</button>
            <input type="hidden" name="company_id" value={params.id} />
            <select name="contact_id" id="contact_id" className="w-96 text-black p-1">
              {contact_list.map(contact => (
                <option key={`contact-${contact.id}`} value={contact.id} className="">{contact.name} - {contact.email}</option>
              ))}
            </select>
            
          </form>
        </div>
      )
    }
  }
}