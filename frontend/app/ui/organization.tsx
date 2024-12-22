import '@/app/ui/global.css';
import {Organization} from '@/app/lib/organization';

export default function OrganizationCard(org:Organization) {
  return (
    <div className='bg-black bg-opacity-25' key={org.org.organization.id}>
        <h1>{org.org.organization.ekultur_id} - {org.org.organization.short_name} - {org.org.organization.name}</h1>
        <ul className="list-inside list-disc">
            {org.org.companies.map((comp) => {
                return(
                    <li key={comp.id}>
                        {comp.ekultur_id}: {comp.name}
                    </li>    
                )
            })}
        </ul>
    </div>
  )
}