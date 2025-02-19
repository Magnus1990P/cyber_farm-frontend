import React, { useState, useEffect } from 'react';

import { Company } from "@/app/lib/company";
import {CompanyCard} from "./companycard";


export function CompanyGrid() {
    const [isLoading, setLoading] = useState(true)
    const [companyList, setCompanyList] = useState([]);

    useEffect(() => {
        const options = { method: "GET"};
        fetch("http://localhost:8000/companies/", options)
        .then(response => {
            if(response.ok){ return response.json(); }
            else{ throw new Error("Failed query", {cause: response}); }
        })
        .then(data => {
            setCompanyList(data);
            setLoading(false);
        })
        .catch(function(err) {
            setLoading(false);
            setCompanyList([]);
            console.log(err);
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