"use client";
import React, { useState, useEffect } from 'react';

import { Company } from "@/app/lib/company";
import {CompanyCard} from "./companycard";


export function CompanyGrid() {
    const [companyList, setCompanyList] = useState([]);

    useEffect(() => {
        fetch(`/api/companies?query=all`)
        .then(response => {
            if(response.ok){ return response.json(); }
            else { throw new Error("Failed query", {cause: response}); }
        })
        .then(data => {
            setCompanyList(data);
        })
        .catch(function(err) {
            setCompanyList([]);
            console.log(err);
        });
    },[]);

    return (
        <div  key='company_list' 
            className='grid justify-center auto-rows-auto md:grid-cols-3 mx-5 gap-5' >
            {(companyList as Company[]).map((data:Company) => {
                return(
                    <CompanyCard key={data.id} company={data} />
                )
            })}
        </div>
    );
}