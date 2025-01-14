
"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

function handleProductSubmit(formData:FormData) {
  var company_id = Number(formData.get("company_id"));
  var product_id = formData.get("product_id");
  fetch(`http://localhost:8000/companies/${company_id}/contacts/${product_id}`, {
    method: "PUT"
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
}

export default function RegisterProduct() {
  const params = useParams();
  const [vendor_list, setVendorList] = useState([]);
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`http://localhost:8000/vendors/?query=all`)
      .then(response => response.json())
      .then(data => {
        setVendorList(data);
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
        <form action={handleProductSubmit}>
          <input type="hidden" name="company_id" value={params.id} />
          <label for="product_id" className='font-mono text-lg'>Add product: </label>
          <select name="product_id" id="product_id" className="w-96">
            {vendor_list.map(vendor => (
              vendor.products.map(product => (
                <option key={`product-${product.id}`} value={product.id} className="">{vendor.name} - {product.name}</option>
              ))
            ))}
          </select>
          <button className='text-orange font-mono rounded-lg text-lg font-bold px-3 ml-10 py-2 bg-gray-800 hover:bg-gray-700 focus:ring-gray-700 border-gray-700' type="submit">Submit</button>
          
        </form>
      </div>
    )
  }
}
