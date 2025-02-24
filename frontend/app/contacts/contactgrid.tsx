"use client";

import React, { useState, useEffect } from 'react';

import { Contact } from "@/app/lib/contact";
import {ContactCard} from "./contactcard";

export function ContactGrid() {
    const [contactList, setContactList] = useState([]);
    const [isLoading, setLoading] = useState(true)
    
    useEffect(() => {
        fetch(`http://${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/contacts/`)
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
            <div className='col bg-gray-900 mx-auto w-3/4 rounded-md p-10 text-center'>
                <p className='text-lg text-green-600 font-bold font-mono'>Loading data</p>
            </div>
        );
    }
    else {
        if(contactList.length == 0){
            return (
                <div className='col bg-gray-900 mx-auto w-3/4 rounded-md p-10 text-center'>
                    <p className='text-xl text-blue-600 font-bold font-mono'>No data</p>
                </div>
            );
        }
        else{
            return (
                <div key='ContactGrid' className='grid justify-center auto-rows-auto md:grid-cols-3 mx-5 gap-5' >
                    {(contactList as Contact[]).map((contact:Contact) => {
                        return (
                            <ContactCard key={'contact-'+contact.id} contact={contact} />
                        )
                    })}
                </div>
            );
        }
    }
};
