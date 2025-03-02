"use client";

import React, { useState, useEffect } from 'react';

import { Contact } from "@/app/lib/contact";
import {ContactCard} from "./contactcard";

export function ContactGrid() {
    const [contactList, setContactList] = useState([]);
    useEffect(() => {
        fetch(`/api/contacts/`)
        .then(response => {
            if(response.ok){ return response.json(); }
            else { throw new Error("Failed query", {cause: response}); }
        })
        .then(data => {
            setContactList(data);
        })
        .catch(function(err) {
            setContactList([]);
            console.log(err);
        });
    },[]);
    
    return (
        <div key='ContactGrid' className='grid justify-center auto-rows-auto md:grid-cols-3 mx-5 gap-5' >
            {(contactList as Contact[]).map((contact:Contact) => {
                return (
                    <ContactCard key={'contact-'+contact.id} contact={contact} />
                )
            })}
        </div>
    );
};
