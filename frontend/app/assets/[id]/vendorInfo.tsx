"use client";

import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

function VendorInfo() {
    const params = useParams();
    const [vendorData, setVendorData] = useState([]);
    const [isLoading, setLoading] = useState(true)
  
    useEffect(() => {
      fetch("http://localhost:8000/vendors/"+params.id)
        .then(response => response.json())
        .then(data => setVendorData(data) + setLoading(false));
    }, []);

    if(isLoading){
        <>
            <div className='col bg-purple-500 p-10 text-center'>
                <h2>Loading data</h2>
            </div>
        </>
    }
    else{
        return (
            <>
                <div className='col bg-purple-500 p-10 text-center'>
                    <h1>{vendorData.id} - {vendorData.name}</h1>
                </div>
                <div className='col bg-orange-500 p-10 text-center'>
                    <ul>
                        {vendorData.products.map(product => (
                            <li key={product.id} className='flex item-center'>
                                <svg class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                </svg>
                                {product.id} - {product.name}</li>
                        ))}
                    </ul>
                </div>
            </>
        );    
    }
    
}

export default VendorInfo;