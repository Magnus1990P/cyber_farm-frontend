interface CompanyType {
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
    organization_id: number;
  
    constructor(id:number, ekultur_id: string, short_name: string, name: string, 
          isMember: boolean, noticeHCERT: boolean, organization_number: string,
          organization: number, contacts: number[], products: number[],
          organization_id: number) {
        this.id = id;
        this.ekultur_id = ekultur_id;
        this.short_name = short_name;
        this.name = name;
        this.isMember = isMember;
        this.noticeHCERT = noticeHCERT;
        this.organization_number = organization_number;
        this.organization = organization;
        this.contacts = contacts;
        this.products = products;
        this.organization_id = organization_id;
    }

    static fromJSON(json: object): Company {
        return new Company(
            json.id,
            json.ekultur_id,
            json.short_name,
            json.name,
            json.isMember,
            json.noticeHCERT,
            json.organization_number,
            json.organization,
            json.contacts,
            json.products,
            json.organization_id
        );
    }
}