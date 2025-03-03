"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

import { Company } from '@/app/lib/company';


export function CreateOrganization() {
  const params = useParams();
  const [company_list, setCompanyList] = useState([]);

  function handleProductSubmit(formData:FormData) {
      const company_id = Number(formData.get("company_id"));
      fetch(`http://${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/organizations?company_id=${company_id}`, {
        method: "POST"
      })
      .then(response => {
          if(response.ok){ return response.json(); }
          else { throw new Error("Failed query", {cause: response}); }
      })
      .then(data => {
          alert("Created new organization");
          console.log(data);
      })
      .catch(function(err) {
        alert("Creation failed");
        console.log(err);
      });
  }

  useEffect(() => {
    fetch(`/api/companies`)
    .then(response => {
        if(response.ok){ return response.json(); }
        else{ throw new Error("Failed query", {cause: response}); }
    })
      .then(data => {
        setCompanyList(data);
      })
      .catch(function(err) {
          setCompanyList([]);
          console.log(err);
      });
  }, []);
  

  return (
    <div className='bg-gray-700 shadow-lg shadow-black rounded-xl m-5 p-5 text-orange-500'>
      <form action={handleProductSubmit}>
        <button
          className='text-orange font-mono rounded-lg px-3 mr-5 py-1 bg-gray-800 hover:bg-gray-700 focus:ring-gray-700 border-gray-700'
          type="submit">Create organization based on:</button>
        <input type="hidden" name="organization_id" value={params.id} />
        <select name="company_id" id="company_id" className="w-96 text-black p-1">
          {company_list.map((company:Company) => (
            <option key={`company-${company.id}`} value={company.id} className="">{company.name}</option>
          ))}
        </select>
      </form>
    </div>
  );
}
