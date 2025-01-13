import {Organization} from '@/app/lib/organization';
import Link from "next/link";

export function OrganizationCard({organization}: {organization:Organization}) {
    return (
        <div className='bg-white p-3 rounded-lg shadow-md shadow-black' key='{org_obj.id}-div' >
            <Link href={"/organizations/"+organization.organization.id}>
                <p className='text-lg font-medium text-center underline'>{organization.organization.name}</p>
            </Link>
            <p className='text-sm font-mono text-left'>eKulturID: {organization.organization.ekultur_id}</p>
            <p className='text-sm font-mono text-left'>Short name: {organization.organization.short_name}</p>
            <table className="w-full font-mono text-sm text-left rtl:text-right text-black">
                <thead className="text-sm font-bold text-white uppercase bg-gray-500">
                    <tr>
                        <th scope="col" className="px-2 py-1">eKit ID</th>
                        <th scope="col" className="px-2 py-1">Short name</th>
                        <th scope="col" className="px-2 py-1">Name</th>
                    </tr>
                </thead>
                <tbody>
                    {organization.companies.map((company) => {
                        return(
                            <tr key={"tr-"+organization.organization.id+"-"+company.id} className="odd:bg-gray-200">
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