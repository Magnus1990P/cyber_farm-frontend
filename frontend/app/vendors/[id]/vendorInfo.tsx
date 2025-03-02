"use client";

import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { BiCog } from "react-icons/bi";

import { Vendor } from '@/app/lib/vendor';
import { Contact } from '@/app/lib/contact';
import { Company } from '@/app/lib/company';
import { Product } from '@/app/lib/product';
import NewProduct from './product_create';
import { ProductCard } from './productcard';

function VendorInfo() {
    const params = useParams();
    const [vendorData, setVendorData] = useState();
    const used_contacts:number[] = [];
    

    const fetchData = async () => {
        const response = await fetch(`/api/vendors/${params.id}`)
        const data = await response.json();
        setVendorData(data);
    }

    useEffect(() => {
        fetchData();
    },[]);

    if( typeof vendorData === "object" ) {
        let vendor:Vendor = vendorData as Vendor;
        return (
            <>
                <div key="vendor" className='col col-span-2 bg-white shadow-md py-3 rounded-xl mb-5'>
                    <p className="ml-10 text-2xl font-mono font-bold">{vendor.name}</p>
                    <p className="ml-3 font-mono">Vendor data</p>
                </div>

                <div key="overview" className='col col-span-2 row-span-2 ml-5 bg-white shadow-md align-middle rounded-lg'>
                    <p className="ml-10 text-lg font-mono font-bold underline">Registered products:</p>
                    <ul key="product-list">
                        {vendor.products.map(product => (
                            <li key={product.id} className='flex ml-3 item-center text-center'>
                                <BiCog /> &nbsp; {product.id} - {product.name}
                            </li>
                        ))}
                    </ul>
                </div>
                
                <NewProduct key="reg_product" />

                <div 
                    className='col w-auto col-span-4 mt-5 bg-gray-900 text-white shadow-md p-5 text-center rounded-xl shadow-white'>
                    <p className='text-xl underline font-medium'>All contacts</p>
                    <p className='font-mono'>
                        {vendor.products.map((product:Product) => (
                            (product.companies as Company[]).map((company:Company) => (
                                (company.contacts as any).map((contact:Contact) => {
                                    if(used_contacts.indexOf(contact.id)===-1){
                                        used_contacts.push(contact.id);
                                        if(used_contacts.length>1) return ("; " + contact.email);
                                        else return (contact.email);
                                    }
                                })
                            ))
                        ))}
                    </p>
                </div>

                {(vendor.products).map((product:Product) => (
                    <ProductCard key={`pc-${product.id}`} product={product} />
                ))}
            </>
        );    
    }
}


export default VendorInfo;