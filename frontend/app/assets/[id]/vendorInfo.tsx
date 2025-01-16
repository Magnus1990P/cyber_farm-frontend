"use client";

import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { BiCog } from "react-icons/bi";

import NewProduct from './product_create';
import { ProductCard } from './productcard';

function VendorInfo() {
    const params = useParams();
    const [vendorData, setVendorData] = useState([]);
    const [isLoading, setLoading] = useState(true)
    const contacts = [];
  
    useEffect(() => {
      fetch(`http://localhost:8000/vendors/${params.id}?query=vendorview`)
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
                <div key="vendor" className='col col-span-2 bg-white shadow-md py-3 rounded-xl mb-5'>
                    <p className="ml-10 text-2xl font-mono font-bold">{vendorData.name}</p>
                    <p className="ml-3 font-mono">Vendor data</p>
                </div>

                <div key="overview" className='col col-span-2 row-span-2 ml-5 bg-white shadow-md align-middle rounded-lg'>
                    <p className="ml-10 text-lg font-mono font-bold underline">Registered products:</p>
                    <ul key="product-list">
                        {vendorData.products.map(product => (
                            <li key={product.id} className='flex ml-3 item-center text-center'>
                                <BiCog /> &nbsp; {product.id} - {product.name}
                            </li>
                        ))}
                    </ul>
                </div>
                
                <NewProduct key="reg_product" />

                <div className='col w-auto col-span-4 mt-5 bg-gray-900 text-white shadow-md p-5 text-center rounded-xl shadow-white'>
                    <p className='text-xl underline font-medium'>All contacts</p>
                    <p className='font-mono'>
                    {vendorData.products.map(product => (
                        product.companies.map(company => (
                            company.contacts.map(contact => {
                                if(contacts.indexOf(contact.id)===-1){
                                    contacts.push(contact.id);
                                    if(contacts.length>1) return ("; " + contact.email);
                                    else return (contact.email);
                                }
                            })
                        ))
                    ))}
                    </p>
                </div>

                {vendorData.products.map(product => (
                    <ProductCard key={`pc-${product.id}`} product={product} />
                ))}
            </>
        );    
    }
}

export default VendorInfo;