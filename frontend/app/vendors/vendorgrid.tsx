"use client";
import { Vendor } from "@/app/lib/vendor";
import React, { useState, useEffect } from 'react';
import {VendorCard} from "./vendorcard"


export function VendorGrid() {
    const [vendorList, setvendorList] = useState([]);
    const [isLoading, setLoading] = useState(true)
    
    useEffect(() => {
        fetch("http://localhost:8000/vendors/")
        .then(response => {
            if(response.ok){ return response.json(); }
            else { throw new Error("Failed query", {cause: response}); }
        })
        .then(data => {
            setvendorList(data);
            setLoading(false);
        })
        .catch(function(err) {
            setLoading(false);
            setvendorList([]);
            console.log(err);
        });
    }, []);
    
    if(isLoading){
        return (
            <div key='vendor_list' className='col bg-purple-500 p-10 text-center'>
                <h2>Loading data</h2>
            </div>
        );
    }
    else {
        return (
            <div key='vendor_list'
                className='grid justify-center auto-rows-auto md:grid-cols-3 mx-5 gap-5' >
                {vendorList.map((data:JSON) => {
                    return (
                        <VendorCard key={data.id} vendor={Vendor.fromJSON(data)} />
                    );
                })}
            </div>
        );
    }
};
