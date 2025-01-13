"use client";

import { Contact } from "@/app/lib/contact";
import React, { useState, useEffect } from 'react';
import {ContactCard} from "./contactcard";

export function ContactGrid() {
    const [contactList, setContactList] = useState([]);
    const [isLoading, setLoading] = useState(true)
    
    useEffect(() => {
        fetch("http://localhost:8000/contacts/")
        .then(response => response.json())
        .then(data => {
            setContactList(data);
            setLoading(false);
        });
    }, []);
    
    if(isLoading){
        return (
            <div key='Loading' className='flex justify-center auto-rows-auto md:grid-cols-3 mx-5 gap-5' >
                <h1>failed to retrieve contact data</h1>
            </div>
        );
    }
    else {
        return (
            <div key='ContactGrid' className='grid justify-center auto-rows-auto md:grid-cols-3 mx-5 gap-5' >
                {contactList.map((data:JSON) => {
                    var contact = Contact.fromJSON(data);
                    return (
                        <ContactCard key={'contact-'+contact.id} contact={contact} />
                    )
                })}
            </div>
        );
    }
};
