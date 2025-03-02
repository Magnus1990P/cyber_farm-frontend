'use client';

import React, { useState, useEffect } from 'react';

import {Organization} from '@/app/lib/organization';
import {OrganizationCard} from './organizationcard';

export function OrganizationsGrid() {
    const [organizationList, setOrganizationList] = useState([]);

    useEffect(() => {
        fetch(`/api/organizations/`)
        .then(response => {
            if(response.ok){ return response.json(); }
            else { throw new Error("Failed query", {cause: response}); }
        })
        .then(data => {
            setOrganizationList(data);
            console.log(data);
        })
        .catch(function(err) {
            setOrganizationList([]);
            console.log(err);
        });
    },[]);
    
    return (
        <div key='organization'
            className='grid justify-center auto-rows-auto md:grid-cols-4 mx-5 gap-5' >
            {organizationList.map((data:JSON) => {
                const organization = Organization.fromJSON(data);
                return(
                    <OrganizationCard key={organization.organization.id} organization={organization} />
                )
            })}
        </div>
    )
}