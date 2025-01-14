"use client";

import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { BiSolidContact, BiSolidChevronRight, BiCog } from "react-icons/bi";
import RegisterContact from './contact_register'
import RegisterProduct from './product_register'

function CompanyInfo() {
    const params = useParams();
    const [companyData, setCompanyData] = useState([]);
    const [isLoading, setLoading] = useState(true)
  
    useEffect(() => {
      fetch(`http://localhost:8000/companies/${params.id}?query=all`)
        .then(response => response.json())
        .then(data => {
            setCompanyData(data);
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
                <div className='col col-span-2 bg-white shadow-md py-3 text-w rounded-xl mb-5'>
                    <p className='text-center ml-10 text-lg font-mono font-bold'>{companyData.name} ({companyData.short_name})</p>
                    <p className='ml-5 font-mono'><span className='font-bold'>EkulturID:</span> {companyData.ekultur_id	}</p>
                    <p className='ml-5 font-mono'><span className='font-bold'>ISAC member:</span> {companyData.isMember ? "YES" : "No"}</p>
                    <p className='ml-5 font-mono'><span className='font-bold'>Notice CERT:</span> {companyData.noticeHCERT ? "YES" : "No"}</p>
                    <p className='ml-5 font-mono'><span className='font-bold'>Org number:</span> {companyData.organization_number}</p>
                </div>

                <div className='col col-span-1 row-span-2 ml-5 bg-white shadow-md align-middle rounded-lg'>
                    <p className='ml-10 text-lg font-mono font-bold'>Contacts:</p>
                    <ul className='ml-3'>
                        {companyData.contacts.map(contact => (
                            <li key={contact.id} className='flex item-center text-center'>
                                <BiSolidContact /> {contact.name} - {contact.email}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='col col-span-1 row-span-2 ml-5 bg-white shadow-md align-middle rounded-lg'>
                <p className='ml-10 text-lg font-mono font-bold'>Products:</p>
                <ul className='ml-3'>
                        {companyData.products.map(product => (
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