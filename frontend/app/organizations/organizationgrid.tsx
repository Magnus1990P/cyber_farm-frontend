'use client';

import {Organization} from '@/app/lib/organization';
import {OrganizationCard} from './organizationcard';
import React, { useState, useEffect } from 'react';

export function OrganizationsGrid() {
    const [organizationList, setOrganizationList] = useState([]);
    const [isLoading, setLoading] = useState(true)
    
    useEffect(() => {
        fetch("http://localhost:8000/organizations/?index=false")
        .then(response => response.json())
        .then(data => {
            setOrganizationList(data);
            setLoading(false);
        });
    }, []);
    
    if(isLoading) {
        <div key='organization'
            className='flex justify-center auto-rows-auto md:grid-cols-3 mx-5 gap-5' >
            <h1>Loading data</h1>
        </div>
    }
    else {
        return (
            <div key='organization'
                className='grid justify-center auto-rows-auto md:grid-cols-4 mx-5 gap-5' >
                {organizationList.map((data:JSON) => {
                    var organization = Organization.fromJSON(data);
                    return(
                        <OrganizationCard key={organization.organization.id} organization={organization} />
                    )
                })}
            </div>
        )
    }
}