import {Company} from '@/app/lib/company';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';

export default interface ContactType {
    id: number;
    name: string;
    companies: number[];
}

export class Contact implements ContactType {
    id: number;
    name: string;
    email: string;
    phone: string;
    companies: number[];
  
    constructor(id:number, name: string, email:string, phone:string, companies: number[]) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.companies = companies;
    }

    static fromJSON(json: any): Contact {
        return new Contact(
            json.id,
            json.name,
            json.email,
            json.phone,
            json.companies
        );
    }
}

export async function ContactGrid() {
    const data = await fetch('http://localhost:8000/contacts/', {cache: 'no-store'});
    if(data.status == 404){
        return (
            <div
            className='flex justify-center auto-rows-auto md:grid-cols-3 mx-5 gap-5'
            key='ContactGrid'>
                <h1>failed to retrieve contact data</h1>
            </div>
        )
    };
    const vendors = await data.json();
    return (
        <div
            key='ContactGrid' 
            className='flex grid justify-center auto-rows-auto md:grid-cols-3 mx-5 gap-5'
        >
            {vendors.map((data:JSON) => {
                var contact_object = Contact.fromJSON(data);
                return (
                    <ContactCard 
                        id={contact_object.id} 
                        name={contact_object.name}
                        email={contact_object.email}
                        phone={contact_object.phone}
                        companies={contact_object.companies}
                    />
                )
            })}
        </div>
    );
};


function ContactCard(props) {
return (
    <div
    key='{props.id}-vendor'
    className='bg-black bg-opacity-25'>
    <div className="w-fill text-center" key='{props.id}-asset_head'>
        <h1><b>#{props.id}</b> - {props.name}</h1>
        <h2>{props.email} - {props.phone}</h2>
    </div>
    <h2>Receives notices for:</h2>
    <table
        className='ww-fill table-auto border-separate border-spacing-x-2 text-sm font-light text-surface'
        key='table-{props.id}' >
        <thead>
            <tr>
                <th className='bg-lime-700'>#</th>
                <th className='bg-lime-700'>Short-Name</th>
                <th className='bg-lime-700'>Name</th>
            </tr>
        </thead>
        <tbody>
        {props.companies.map((data:JSON) => {
            console.log(data);
            var pobj = Company.fromJSON(data);
            return (
                <tr>
                    <td>{pobj.id}</td>
                    <td>{pobj.short_name}</td>
                    <td>{pobj.name}</td>
                </tr>
            );
        })}
        </tbody>
    </table>
    </div>
);
}