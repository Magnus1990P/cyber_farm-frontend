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
    var company_list: Company[] = [];
    json.companies.map((company:Company) => {
      company_list.push(Company.fromJSON(company));
    });
    return new Organization(
        Company.fromJSON(json.organization),
        company_list
    );
  }
};