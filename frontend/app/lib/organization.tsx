import {Company} from '@/app/lib/company';

interface OrganizationType {
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
    const company_list: Company[] = [];
    (json.companies as Company[]).map((company:Company) => {
      company_list.push(Company.fromJSON(company));
    });
    return new Organization(
        json.organization as Company,
        company_list
    );
  }
};