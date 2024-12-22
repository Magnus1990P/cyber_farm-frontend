import CompanyType from '@/app/lib/company';
import {Company} from '@/app/lib/company';

export default interface OrganizationType {
    organization: Company;
    companies: [];
}

export class Organization implements OrganizationType {
    organization: Company;
    companies: Company[];
      
    constructor(organization: Company, companies: Company[]) {
        this.organization = organization;
        this.companies = companies;
    }

    static fromJSON(json: any): Organization {
        var companies: Company[] = [];
        json.companies.map((company:CompanyType) => {
            companies.push(Company.fromJSON(company));
        })

        return new Organization(
            Company.fromJSON(json.data),
            companies
        );
    }
}
