"use client";

import { Contact } from "@/app/lib/contact";
import React, { useState, useEffect } from 'react';
import {ContactCard} from "./contactcard";

export function ContactGrid() {
    const [contactList, setContactList] = useState([]);
    const [isLoading, setLoading] = useState(true)
    
    useEffect(() => {
        fetch("http://localhost:8000/contacts/")
        .then(response => {
            if(response.ok){ return response.json(); }
            else{ throw new Error("Failed query", {cause: response}); }
        })
        .then(data => {
            setContactList(data);
            setLoading(false);
        })
        .catch(function(err) {
            setLoading(false);
            setContactList([]);
            console.log(err);
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
        if(contactList.length == 0){
            return (
                <div className='col bg-purple-500 p-10 text-center'>
                    <h2>No data</h2>
                </div>
            );
        }
        else{
            return (
                <div key='ContactGrid' className='grid justify-center auto-rows-auto md:grid-cols-3 mx-5 gap-5' >
                    {contactList.map((data:JSON) => {
                        const contact = Contact.fromJSON(data);
                        return (
                            <ContactCard key={'contact-'+contact.id} contact={contact} />
                        )
                    })}
                </div>
            );
        }
    }
};
