"use client";
import { Vendor } from "@/app/lib/vendor";
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import {AssetCard} from "./assetcard"


export function AssetGrid() {
    const params = useParams();
    const [vendorList, setvendorList] = useState([]);
    
    useEffect(() => {
        fetch("http://localhost:8000/vendors/")
        .then(response => response.json())
        .then(data => setvendorList(data));
    }, []);
    
    return (
        <div key='vendors' className='flex grid justify-center auto-rows-auto md:grid-cols-3 mx-5 gap-5' >
            {vendorList.map((data:JSON) => {
                var vendor_object = Vendor.fromJSON(data);
                return (
                    <AssetCard 
                        id={vendor_object.id} 
                        name={vendor_object.name}
                        products={vendor_object.products}
                    />
                )
            })}
        </div>
    );
};
