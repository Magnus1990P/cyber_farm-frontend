"use client";

import React, { useState, useEffect } from 'react';

import { Vendor } from "@/app/lib/vendor";
import {VendorCard} from "./vendorcard"


export function VendorGrid() {
    const [vendorList, setvendorList] = useState([]);
    
    useEffect(() => {
        fetch(`/api/vendors/`)
        .then(response => {
            if(response.ok){ return response.json(); }
            else { throw new Error("Failed query", {cause: response}); }
        })
        .then(data => {
            setvendorList(data);
        })
        .catch(function(err) {
            setvendorList([]);
            console.log(err);
        });
    },[]);
    
    return (
        <div key='vendor_list'
            className='grid justify-center auto-rows-auto md:grid-cols-3 mx-5 gap-5' >
            {(vendorList as Vendor[]).map((data:Vendor) => {
                return (
                    <VendorCard key={data.id} vendor={data} />
                );
            })}
        </div>
    );
};
