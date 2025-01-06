import '@/app/ui/global.css';
import {Organization} from '@/app/lib/organization';

export default function OrganizationCard({organization}: {organization:Organization}) {
    const { organization: org_obj, companies } = organization;
    return (
        <div className='bg-black bg-opacity-25' key='{org_obj.id}-div' >
            <h1>{org_obj.id} - {org_obj.ekultur_id} - {org_obj.short_name} - {org_obj.name}</h1>
            <table className="w-fill table-auto border-separate border-spacing-x-2 text-sm font-light text-surface">
                <thead>
                    <tr>
                        <th className='bg-lime-700'>#</th>
                        <th className='bg-lime-700'>EkulturID</th>
                        <th className='bg-lime-700'>Short name</th>
                        <th className='bg-lime-700'>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map((company) => {
                        return(
                            <tr className="odd:bg-gray-100">
                                <td className=''>{company.id}</td>
                                <td className=''>{company.ekultur_id}</td>
                                <td className=''>{company.short_name}</td>
                                <td className=''>{company.name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}