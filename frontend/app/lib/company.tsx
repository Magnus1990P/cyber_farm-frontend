export default interface CompanyType {
    id: number;
    ekultur_id: string;
    short_name: string
    name: string;
    isMember: boolean;
    noticeHCERT: boolean;
    organization_number: string;
    organization: number;
    contacts: number[];
    products: number[];
}

export class Company implements CompanyType {
    id: number;
    ekultur_id: string;
    short_name: string;
    name: string;
    isMember: boolean;
    noticeHCERT: boolean;
    organization_number: string;
    organization: number;
    contacts: number[];
    products: number[];
  
    constructor(id:number, ekultur_id: string, short_name: string, name: string, 
          isMember: boolean, noticeHCERT: boolean, organization_number: string,
          organization: number, contacts: number[], products: number[]) {
        this.ekultur_id = ekultur_id;
        this.short_name = short_name;
        this.name = name;
        this.isMember = isMember;
        this.noticeHCERT = noticeHCERT;
        this.organization_number = organization_number;
        this.organization = organization;
        this.contacts = contacts;
        this.products = products;
    }

    static fromJSON(json: any): Company {
        return new Company(
            json.id,
            json.ekultur_id,
            json.short_name,
            json.name,
            json.isMember,
            json.organization_number,
            json.organization,
            json.contacts,
            json.products
        );
    }
}
