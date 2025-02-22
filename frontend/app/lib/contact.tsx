import {Company} from '@/app/lib/company';

interface ContactType {
    id: number;
    name: string;
    companies: Company[];
}

export class Contact implements ContactType {
    id: number;
    name: string;
    email: string;
    phone: string;
    companies: Company[];
  
    constructor(id:number, name: string, email:string, phone:string, companies: Company[]) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.companies = [];
        companies.map(company => {
            this.companies.push(Company.fromJSON(company));
        });
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
};