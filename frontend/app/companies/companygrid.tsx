import React, { useState, useEffect } from 'react';

import { useMsal } from '@azure/msal-react';
import { loginRequest } from '@/app/lib/authConfig';
import { Company } from "@/app/lib/company";
import {CompanyCard} from "./companycard";


export function CompanyGrid() {
    const { instance, accounts } = useMsal();

    const [isLoading, setLoading] = useState(true)
    const [authLoading, setAuthLoading] = useState(true)
    const [accessToken, setAccessToken] = useState(true)
    const [companyList, setCompanyList] = useState([]);

    useEffect(() => {
        instance.acquireTokenSilent({...loginRequest, account: accounts[0], })
        .then((response) => {
            setAuthLoading(false);
            setAccessToken(response.accessToken);
        });
    }, [isLoading]);

    useEffect(() => {
        const headers = new Headers;
        headers.append("Authorization", `Bearer ${accessToken}`);

        const options = { method: "GET", headers: headers };
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
        });
    }, [authLoading]);

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