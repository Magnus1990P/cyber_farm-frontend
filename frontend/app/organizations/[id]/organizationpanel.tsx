'use client';

import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { BiSolidContact, BiSolidChevronRight, BiCog } from "react-icons/bi";
import Link from "next/link";
import {RegisterCompany} from './add_company'

export function OrganizationPanel() {
  const params = useParams();
  const [vendors, setVendor] = useState([]);
  const [organization, setOrganization] = useState([]);
  const [isLoading, setLoading] = useState(true)
  const [isLoadingVendors, setLoadingVendors] = useState(true)

  useEffect(() => {
      fetch("http://localhost:8000/vendors/?query=list")
      .then(response => {
          if(response.ok){ return response.json(); }
          else{ throw new Error("Failed query", {cause: response}); }
      })
      .then(data => {
          setLoadingVendors(false);
          setVendor(data);
      })
      .catch(function(err) {
          setLoading(false);
          setVendor([]);
          console.log(err);
      });

      fetch("http://localhost:8000/organizations/"+params.id)
      .then(response => {
          if(response.ok){ return response.json(); }
          else{ throw new Error("Failed query", {cause: response}); }
      })
      .then(data => {
          setOrganization(data);
          setLoading(false);
      })
      .catch(function(err) {
          setOrganization([]);
          setLoading(false);
          console.log(err);
      });
  }, [params.id]);

  if(isLoading || isLoadingVendors) {
    return (
      <div key='organization'
          className='flex justify-center auto-rows-auto md:grid-cols-3 mx-5 gap-5'>
          <h1>failed to retrieve data</h1>
      </div>
    );
  }
  else {
    if(organization.length == 0){
        return (
            <div className='col bg-purple-500 p-10 text-center'>
                <h2>No data</h2>
            </div>
        );
    }
    else{
      return (
        <div className='grid mx-10 space-y-5 grid-cols-3 space-x-5'>
          <div className='col col-span-3 bg-white  shadow-md p-5 text-center rounded-xl shadow-black'>
            <p className='text-xl'>{organization.organization.name} ({organization.organization.short_name})</p>
            <p className=''>eKultur ID: {organization.organization.ekultur_id}</p>
            <p className=''>Organization {organization.organization.isMember ? "is" : "is not"} a member of the KulturIT ISAC</p>
            <p className=''>Member has {organization.organization.noticeHCERT ? "refused" : "approved"} notifications to HelseCERT</p>
          </div>

          <div className='col w-auto col-span-3 bg-gray-900 text-white shadow-md p-5 text-center rounded-xl shadow-white'>
            <p className='text-xl underline font-medium'>All contacts</p>
            <p className='font-mono'>
              {organization.contacts.map((tag, i) => {
                if (i>0) return ("; " + tag.email);
                else return (tag.email);
              })}
            </p>
          </div>

          <div className='col bg-white shadow-md text-center rounded-xl shadow-black'>
            <p className='text-xl underline text-left font-medium p-5'>Companies</p>
            <RegisterCompany />
            <ul className='p-5'>
              {organization.companies.map(company => (
                  <li key={company.id} className='flex'>
                      <BiSolidChevronRight /> <Link href={"/companies/"+company.id}>{company.name}</Link>
                  </li>
              ))}
            </ul>
          </div>

          <div className='col bg-white shadow-md p-5 text-center rounded-xl shadow-black'>
            <p className='text-xl underline font-medium'>Contacts (global)</p>
              {organization.contacts.map(contact => (
                  <li key={contact.id} className='flex'>
                      <BiSolidContact /> <Link href={"/contacts/"+contact.id}>{contact.name} - {contact.email} - {contact.phone}</Link>
                  </li>
              ))}
          </div>
          
          <div className='col bg-white shadow-md p-5 text-center rounded-xl shadow-black'>
            <p className='text-xl underline font-medium'>Products (global)</p>
              {organization.products.map(product => (
                  <li key={product.id} className='flex'>
                      <BiCog /> <Link href={"/assets/"+product.vendor_id}>
                        {(vendors.find((item)=>item.id===product.vendor_id)).name} - {product.name}
                      </Link>
                  </li>
              ))}
          </div>
        </div>
      );
    }
  }
}