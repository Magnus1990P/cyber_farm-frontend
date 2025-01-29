
import Link from "next/link";
import { BiCog, BiSolidBusiness, BiSolidContact } from "react-icons/bi";
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import {Product} from '@/app/lib/product';
import {Company} from '@/app/lib/company';


export function ProductCard({product}:{product:Product}) {
    const contacts = [];
  return (
    <div className='col ml-5 mt-5 bg-white shadow-md align-middle rounded-lg'>
        <p className="ml-10 text-lg font-mono font-bold underline">{product.name}</p>
        <p className="ml-3 text-lg font-mono font-bold">Companies</p>
        <ul>
            {product.companies.map(company => (
                <li key={`${product.id}-${company.id}`} className='flex ml-3 item-center text-center'>
                    <BiSolidBusiness /> &nbsp; <Link href={`/companies/${company.id}`}>{company.name} ({company.short_name})</Link>
                </li>
            ))}
        </ul>

        <p className="ml-3 text-lg font-mono font-bold">Contacts</p>
        <ul>
            {product.companies.map(company => (
                company.contacts.map(contact => {
                    if(contacts.indexOf(contact.id)===-1){
                        contacts.push(contact.id);
                        return (
                            <li key={`${product.id}-${company.id}-${contact.id}`} className='flex ml-3 item-center text-center'>
                                <BiSolidContact /> &nbsp; <Link href={`/contacts/${contact.id}`}>{contact.name} ({contact.email})</Link>
                            </li>
                        )
                    }
                })
            ))}
        </ul>
    </div>
  );
};

