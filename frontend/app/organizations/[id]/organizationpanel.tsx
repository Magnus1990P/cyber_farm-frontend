'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { BiSolidContact, BiSolidChevronRight, BiCog } from "react-icons/bi";
import Link from "next/link";

import {Contact} from '@/app/lib/contact';
import {Vendor} from '@/app/lib/vendor';
import {Product} from '@/app/lib/product';
import {Company} from '@/app/lib/company';
import {RegisterCompany} from './add_company'

export function OrganizationPanel() {
  const params = useParams();
  const [vendors, setVendor] = useState([]);
  const [organization, setOrganization] = useState([]);
  const [isLoading, setLoading] = useState(true)
  const [isLoadingVendors, setLoadingVendors] = useState(true)

  function VendorText( vendorId:any ){
    let vendor = (vendors as Vendor[]).find((item:Vendor)=>item.id==vendorId);
    if(typeof vendor === "object" && vendor !== null){
      return (<>{vendor.name}</>)
    }
    else{
      return (<>Unknown</>)
    }
  }

  useEffect(() => {
      fetch(`http://${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/vendors/?query=list`)
      .then(response => {
          if(response.ok){ return response.json(); }
          else{ throw new Error("Failed query", {cause: response}); }
      })
      .then(data => {
          setLoadingVendors(false);
          setVendor(data);
      })
      .catch(function(err) {
          setVendor([]);
          console.log(err);
          setLoadingVendors(false);
      });

      fetch(`http://${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/organizations/${params.id}`)
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
    if(
        typeof organization === "object" && 
        "organization" in organization && 
        "contacts" in organization && 
        "companies" in organization && 
        "products" in organization &&
        typeof vendors === "object"
      ){
      
      const org_object = organization.organization as Company;
      const contacts = organization.contacts as Contact[];
      const companies = organization.companies as Company[];
      const products = organization.products as Product[];
      
      return (
        <div className='grid mx-10 space-y-5 grid-cols-3 space-x-5'>
          <div className='col col-span-3 bg-white  shadow-md p-5 text-center rounded-xl shadow-black'>
            <p className='text-xl'>{(org_object).name} ({org_object.short_name})</p>
            <p className=''>eKultur ID: {org_object.ekultur_id}</p>
            <p className=''>Organization {org_object.isMember ? "is" : "is not"} a member of the KulturIT ISAC</p>
            <p className=''>Member has {org_object.noticeHCERT ? "refused" : "approved"} notifications to HelseCERT</p>
          </div>

          <div className='col w-auto col-span-3 bg-gray-900 text-white shadow-md p-5 text-center rounded-xl shadow-white'>
            <p className='text-xl underline font-medium'>All contacts</p>
            <p className='font-mono'>
              {contacts.map((tag:Contact, i:number) => {
                if (i>0) return ("; " + tag.email);
                else return (tag.email);
              })}
            </p>
          </div>

          <div className='col bg-white shadow-md text-center rounded-xl shadow-black'>
            <p className='text-xl underline text-left font-medium p-5'>Companies</p>
            <RegisterCompany />
            <ul className='p-5'>
              {companies.map((company:Company) => (
                  <li key={company.id} className='flex'>
                      <BiSolidChevronRight /> <Link href={"/companies/"+company.id}>{company.name}</Link>
                  </li>
              ))}
            </ul>
          </div>

          <div className='col bg-white shadow-md p-5 text-center rounded-xl shadow-black'>
            <p className='text-xl underline font-medium'>Contacts (global)</p>
              {contacts.map((contact:Contact) => (
                  <li key={contact.id} className='flex'>
                      <BiSolidContact /> <Link href={"/contacts/"+contact.id}>{contact.name} - {contact.email} - {contact.phone}</Link>
                  </li>
              ))}
          </div>
          
          <div className='col bg-white shadow-md p-5 text-center rounded-xl shadow-black'>
            <p className='text-xl underline font-medium'>Products (global)</p>
              {products.map((product:Product) => (
                  <li key={product.id} className='flex'>
                      <BiCog /> <Link href={"/assets/"+product.vendor_id}>
                        <VendorText vendorId={product.vendor_id as number} /> - {product.name}
                      </Link>
                  </li>
              ))}
          </div>
        </div>
      );
    }
    else{
      return (
          <div className='col bg-purple-500 p-10 text-center'>
              <h2>No data</h2>
          </div>
      );
    }
  }
}