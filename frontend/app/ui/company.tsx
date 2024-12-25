import '@/app/ui/global.css';
import {Company} from '@/app/lib/company';

export default function CompanyCard({company}:{company:Company}) {
    return (
        <div className='bg-black bg-opacity-25' key={"company-"+company.id}>
            <h1>{company.id} - {company.ekultur_id} - {company.name}</h1>
            <p></p>
            <p>Organization number: {company.organization_number}</p>
            <p>{company.isMember ? "Is a member" : "Is not a member"}</p>
            <p>{company.noticeHCERT ? "Shall receive HelseCERT notices" : "Does NOT want HelseCERT notices"}</p>
            <p>{company.organization_id ? "Part of an organization" : "Standalone"}</p>
        </div>
    )
}