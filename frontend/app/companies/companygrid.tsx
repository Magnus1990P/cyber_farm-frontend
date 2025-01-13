"use client";
import { Company } from "@/app/lib/company";
import React, { useState, useEffect } from 'react';
import {CompanyCard} from "./companycard"


export function CompanyGrid() {
    const [companyList, setCompanyList] = useState([]);
    const [isLoading, setLoading] = useState(true)
    
    useEffect(() => {
        fetch("http://localhost:8000/companies/")
        .then(response => response.json())
        .then(data => {
            setCompanyList(data);
            setLoading(false);
        });
    }, []);
    
    if(isLoading){
        return (
            <div key='company_list' className='col bg-gray-500 p-10 text-center'>
                <h2>Loading data</h2>
            </div>
        );
    }
    else {
        return (
            <div  key='company_list' 
                className='grid justify-center auto-rows-auto md:grid-cols-3 mx-5 gap-5' >
                {companyList.map((data:JSON) => {
                    return(
                        <CompanyCard key={data.id} company={Company.fromJSON(data)} />
                    )
                })}
            </div>
        );
    }
  }