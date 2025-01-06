import OrganizationCard from '@/app/ui/organization';
import CompanyType from '@/app/lib/company';
import {Company} from '@/app/lib/company';

export default interface OrganizationType {
    organization: Company;
    companies: Company[];
}

export class Organization implements OrganizationType {
    organization: Company;
    companies:Company[];
      
    constructor(organization: Company, companies: Company[]) {
        this.organization = organization;
        this.companies = companies;
    }

    static fromJSON(json: any): Organization {
        var company_list: Company[] = [];
        json.companies.map((company:CompanyType) => {
          company_list.push(Company.fromJSON(company));
        });

        return new Organization(
            Company.fromJSON(json.organization),
            company_list
        );
    }
}

export async function OrganizationsGrid() {
  try {
    const data = await fetch('http://localhost:8000/organizations/?index=false', {cache: 'no-store'});
    const organizations = await data.json();
    return (
      <div
        className='flex grid justify-center auto-rows-auto md:grid-cols-3 mx-5 gap-5'
        key='organization' >
      {organizations.map((data:JSON) => {
        var organization_object = Organization.fromJSON(data);
        return(
          <OrganizationCard organization={organization_object} />
        )
      })
      }
      </div>
    )
  }
  catch {
    return (
      <div
        className='flex justify-center auto-rows-auto md:grid-cols-3 mx-5 gap-5'
        key='organization'>
          <h1>failed to retrieve data</h1>
      </div>
    )
  }
}

export async function OrganizationsPanel({id}:{id:number}) {
  try {
    const data = await fetch(`http://localhost:8000/organizations/${id}`, {cache: 'no-store'});
    console.log(data);
    const organization = await data.json();

    console.log(organization);
    return (
      <div
        className='grid justify-center auto-rows-auto md:grid-cols-3 mx-5 gap-5'
        key='organization'>
      </div>
    )
  }
  catch {
    return (
      <div
        className='flex justify-center auto-rows-auto md:grid-cols-3 mx-5 gap-5'
        key='organization'>
          <h1>failed to retrieve data</h1>
      </div>
    )
  }
}