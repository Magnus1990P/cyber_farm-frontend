"use client";

import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { CiPaperplane } from "react-icons/ci";


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
        <>
            <div className='col bg-purple-500 p-10 text-center'>
                <h2>Loading data</h2>
            </div>
        </>
    }
    else{
        return (
            <>
                <div className='col bg-white shadow-md p-5 text-center rounded-xl'>
                    <h1>{vendorData.id} - {vendorData.name}</h1>
                </div>
                <div className='col bg-white shadow-md p-5 align-middle'>
                    <p>Registered products:</p>
                    <ul>
                        {vendorData.products.map(product => (
                            <li key={product.id} className='flex item-center text-center'>
                                <CiPaperplane /> &nbsp; {product.id} - {product.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </>
        );    
    }
    
}

export default VendorInfo;