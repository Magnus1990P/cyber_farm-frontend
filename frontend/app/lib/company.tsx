import CompanyCard from '@/app/ui/company';

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

    static fromJSON(json: any): Company {
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



export async function CompanyGrid() {
    const data = await fetch('http://localhost:8000/companies/', {cache: 'no-store'});
    if(data.status == 404){
        return (
            <div
            className='flex justify-center auto-rows-auto md:grid-cols-3 mx-5 gap-5'
            key='companies'>
                <h1>failed to retrieve data</h1>
            </div>
        )
    };
    const companies = await data.json();
    
    return (
    <div
        className='grid justify-center auto-rows-auto md:grid-cols-3 mx-5 gap-5'
        key='companies'>
        {companies.map((data:JSON) => {
            var company_object = Company.fromJSON(data);
            return(
                <CompanyCard company={company_object} />
            )
        })
    }
    </div>
    )
  }