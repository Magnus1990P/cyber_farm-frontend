"use client";

import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

function VendorInfo() {
    const params = useParams();
    const [vendorData, setVendorData] = useState([]);
  
    useEffect(() => {
      fetch("http://localhost:8000/vendors/"+params.id)
        .then(response => response.json())
        .then(data => setVendorData(data));
    }, []);

    console.log(vendorData);
    if( !vendorData ) {
        return (
            <div>
                <div>
                    <h2>Loading</h2>
                </div>
            </div>
        )
    }
    else {
        return (
            <div>
                <div>
                    <h2>{vendorData.id} - {vendorData.name}</h2>
                    <ul key="product-list">
                        {vendorData.products.map(pobj => (
                            <li key={pobj.id}>
                                <p>
                                    {pobj.id}: {pobj.name}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default VendorInfo;