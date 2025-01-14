"use client";

import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { CiPaperplane } from "react-icons/ci";

import NewProduct from './product_create';

function VendorInfo() {
    const params = useParams();
    const [vendorData, setVendorData] = useState([]);
    const [isLoading, setLoading] = useState(true)
  
    useEffect(() => {
      fetch("http://localhost:8000/vendors/"+params.id)
        .then(response => response.json())
        .then(data => {
            setVendorData(data);
            setLoading(false);
        });
    }, []);

    if(isLoading){
        return (
            <div className='col bg-purple-500 p-10 text-center'>
                <h2>Loading data</h2>
            </div>
        );
    }
    else{
        return (
            <>
                <div className='col col-span-2 bg-white shadow-md py-3 text-center rounded-xl mb-5'>
                    <h1>{vendorData.id} - {vendorData.name}</h1>
                </div>

                <div className='col col-span-3 row-span-2 ml-5 bg-white shadow-md align-middle rounded-lg'>
                    <p>Registered products:</p>
                    <ul>
                        {vendorData.products.map(product => (
                            <li key={product.id} className='flex item-center text-center'>
                                <CiPaperplane /> &nbsp; {product.id} - {product.name}
                            </li>
                        ))}
                    </ul>
                </div>

                <NewProduct />
            </>
        );    
    }
    
}

export default VendorInfo;