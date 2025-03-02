"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { BiSolidContact, BiCog } from "react-icons/bi";

import {Contact} from '@/app/lib/contact';
import {Product} from '@/app/lib/product';
import RegisterContact from './contact_register'
import RegisterProduct from './product_register'

function CompanyInfo() {
    const params = useParams();
    const [companyData, setCompanyData] = useState<any[]>();
    
    useEffect(() => {
        fetch(`/api/companies/${params.id}?query=all`)
        .then(response => {
            if(response.ok){ return response.json(); }
            else { throw new Error("Failed query", {cause: response}); }
        })
        .then(data => {
            setCompanyData(data);
        })
        .catch(function(err) {
            setCompanyData([]);
            console.log(err);
        });
    },[]);
    

    if(typeof companyData === "object" && "contacts" in companyData && "products" in companyData){
        return (
            <>
                <div className='col col-span-2 bg-white shadow-md py-3 text-w rounded-xl mb-5'>
                    <p className='text-center ml-10 text-lg font-mono font-bold'>{"name" in companyData ? companyData.name as string : "NA"} ({"short_name" in companyData ? companyData.short_name as string: "N/A"})</p>
                    <p className='ml-5 font-mono'><span className='font-bold'>EkulturID:</span> {"ekultur_id" in companyData ? companyData.ekultur_id as string : "N/A"}</p>
                    <p className='ml-5 font-mono'><span className='font-bold'>ISAC member:</span> {"isMember" in companyData && companyData.isMember ? "YES" : "No"}</p>
                    <p className='ml-5 font-mono'><span className='font-bold'>Notice CERT:</span> {"noticeHCERT" in companyData && companyData.noticeHCERT ? "YES" : "No"}</p>
                    <p className='ml-5 font-mono'><span className='font-bold'>Org number:</span> {"organization_number" in companyData ? companyData.organization_number as string : "N/A"}</p>
                </div>

                <div className='col col-span-1 row-span-3 ml-5 bg-white shadow-md align-middle rounded-lg'>
                    <p className='ml-10 text-lg font-mono font-bold'>Contacts:</p>
                    <ul className='ml-3'>
                        {(companyData.contacts as Contact[]).map((contact:any) => (
                            <li key={contact.id} className='flex item-center text-center'>
                                <BiSolidContact /> {contact.name} - {contact.email}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='col col-span-1 row-span-3 ml-5 bg-white shadow-md align-middle rounded-lg'>
                <p className='ml-10 text-lg font-mono font-bold'>Products:</p>
                    <ul className='ml-3'>
                        {(companyData.products as Product[]).map((product:Product) => (
                            <li key={product.id} className='flex item-center text-center'>
                                <BiCog /> &nbsp; {product.id} - {product.name}
                            </li>
                        ))}
                    </ul>
                </div>
                
                <RegisterContact />
                <RegisterProduct />
            </>
        );    
    }
}

export default CompanyInfo;