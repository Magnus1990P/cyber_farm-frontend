"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

import {Company} from '@/app/lib/company';

function handleProductSubmit(formData:FormData) {
  const organization_id = formData.get("organization_id");
  const company_id = Number(formData.get("company_id"));
  fetch(`http://${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/organizations/${organization_id}/companies/${company_id}`, {
    method: "PUT"
  })
  .then(response => {
      if(response.ok){ return response.json(); }
      else { throw new Error("Failed query", {cause: response}); }
  })
  .then(data => {
      alert("Added company to organization");
      console.log(data);
  })
  .catch(function(err) {
    alert("Failed to add company");
    console.log(err);
  });
}

export function RegisterCompany() {
  const params = useParams();
  const [company_list, setCompanyList] = useState([]);
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/companies/`)
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
          console.log(err);
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
        <div className='col bg-gray-500 shadow-lg shadow-black rounded-xl col-span-2 p-5 text-orange-500'>
        </div>
      );
    }
    else{
      return (
        <div className='bg-gray-500 w-fill  text-orange-500'>
          <form action={handleProductSubmit}>
            <input type="hidden" name="organization_id" value={params.id} />
            <select name="company_id" id="company_id" className="w-3/4 text-black overflow-x-hidden">
              {company_list.map((company:Company) => (
                <option key={`company-${company.id}`} value={company.id} className="">{company.name}</option>
              ))}
            </select>
            <button
              className='text-orange font-mono rounded-lg font-bold ml-2 px-2 py-1 bg-gray-800'
              type="submit">Add</button>
          </form>
        </div>
      );
    }
  }
}
