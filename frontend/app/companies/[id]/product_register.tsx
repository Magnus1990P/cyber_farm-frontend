
"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Product } from '@/app/lib/product';
import { Vendor } from '@/app/lib/vendor';

function handleProductSubmit(formData:FormData) {
    const company_id = Number(formData.get("company_id"));
    const product_id = formData.get("product_id");
    fetch(`http://localhost:8000/companies/${company_id}/products/${product_id}`, {
      method: "PUT"
    })
    .then(response => {
        if(response.ok){ return response.json(); }
        else { throw new Error("Failed query", {cause: response}); }
    })
    .then(data => {
        alert("Added product to company");
        console.log(data);
    })
    .catch(function(err) {
      alert("Failed to add product to company");
      console.log(err);
    });
}

export default function RegisterProduct() {
  const params = useParams();
  const [vendor_list, setVendorList] = useState([]);
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`http://localhost:8000/vendors/?query=all`)
    .then(response => {
        if(response.ok){ return response.json(); }
        else{ throw new Error("Failed query", {cause: response}); }
    })
      .then(data => {
        setVendorList(data);
        setLoading(false);
      })
      .catch(function(err) {
          setLoading(false);
          console.log(err);
          setVendorList([]);
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
    if(vendor_list.length > 0){
      return (
        <div className='col bg-gray-900 shadow-lg shadow-black rounded-xl col-span-2 p-5 text-orange-500'>
          <form action={handleProductSubmit}>
            <button className='text-orange font-mono rounded-lg font-bold px-5 mr-5 py-2 bg-gray-800 hover:bg-gray-700 focus:ring-gray-700 border-gray-700' type="submit">Add Product</button>
            <input type="hidden" name="company_id" value={params.id} />
            <select name="product_id" id="product_id" className="w-96 text-black p-1">
              {(vendor_list as Vendor[]).map((vendor:Vendor) => (
                (vendor.products as Product[]).map((product:Product) => (
                  <option key={`product-${product.id}`} value={product.id} className="">{vendor.name} - {product.name}</option>
                ))
              ))}
            </select>
          </form>
        </div>
      );
    }
    else{
      return (
        <div className='col bg-gray-900 shadow-lg shadow-black rounded-xl col-span-2 p-5 text-orange-500'>
          <p className='text-lg text-blue-600 font-bold font-mono'>No vendors loaded</p>
        </div>
      );
    }
  }
}
