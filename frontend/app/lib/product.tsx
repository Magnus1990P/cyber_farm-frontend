import {Company} from "@/app/lib/company";

interface ProductType {
    id: number;
    name: string;
    vendor_id: number;
    companies: Company[];
}

export class Product implements ProductType {
    id: number;
    name: string;
    vendor_id: number;
    companies: Company[];
  
    constructor(id:number,name: string, vendor_id: number, companies:Company[]) {
        this.id = id;
        this.name = name;
        this.vendor_id = vendor_id;
        this.companies = companies;
    }

    static fromJSON(json: any): Product {
        return new Product(
            json.id,
            json.name,
            json.vendor_id,
            json.companies
        );
    }
}

