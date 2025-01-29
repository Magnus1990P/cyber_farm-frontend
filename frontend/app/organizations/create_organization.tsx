
"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

function handleProductSubmit(formData:FormData) {
    var company_id = Number(formData.get("company_id"));
    fetch(`http://localhost:8000/organizations?company_id=${company_id}`, {
      method: "POST"
    })
    .then(response => {
        if(response.ok){ return response.json(); }
        else { throw new Error("Failed query", {cause: response}); }
    })
    .then(data => {
        alert("Created new organization");
    })
    .catch(function(err) {
      alert("Creation failed");
    });
}

export function CreateOrganization() {
  const params = useParams();
  const [company_list, setCompanyList] = useState([]);
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`http://localhost:8000/companies/`)
    .then(response => {
        if(response.ok){ return response.json(); }
        else{ throw new Error("Failed query", {cause: response}); }
    })
      .then(data => {
        setCompanyList(data);
        setLoading(false);
      })
      .catch(function(err) {
          setLoading(false);
          return []
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
    if(company_list.length==0){
      return (
        <div className='col bg-gray-900 shadow-lg shadow-black rounded-xl col-span-2 p-5 text-orange-500'>
        </div>
      );
    }
    else{
      return (
        <div className='bg-gray-700 shadow-lg shadow-black rounded-xl m-5 p-5 text-orange-500'>
          <form action={handleProductSubmit}>
            <button
              className='text-orange font-mono rounded-lg px-3 mr-5 py-1 bg-gray-800 hover:bg-gray-700 focus:ring-gray-700 border-gray-700'
              type="submit">Create organization based on:</button>
            <input type="hidden" name="organization_id" value={params.id} />
            <select name="company_id" id="company_id" className="w-96 text-black p-1">
              {company_list.map(company => (
                <option key={`company-${company.id}`} value={company.id} className="">{company.name}</option>
              ))}
            </select>
          </form>
        </div>
      );
    }
  }
}
