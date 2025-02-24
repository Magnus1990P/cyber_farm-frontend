
import Link from "next/link";

import { Company } from "@/app/lib/company";

export function CompanyCard({company}:{company:Company}) {
    return (
        <div className='bg-white p-3 rounded-lg shadow-md shadow-black font-mono' key={"company-"+company.id}>
            <Link href={`/companies/${company.id}`}>{company.id} - {company.ekultur_id} - {company.name}</Link>
            <p>{company.isMember ? "Is a member" : "Is not a member"}</p>
            <p>Organization number: {company.organization_number}</p>
            <p>{company.noticeHCERT ? "Shall receive HelseCERT notices" : "Does NOT want HelseCERT notices"}</p>
            <p>{company.organization_id ? "Part of an organization" : "Standalone"}</p>
        </div>
    )
}