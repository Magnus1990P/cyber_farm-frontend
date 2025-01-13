import { Contact } from "@/app/lib/contact";
import { Company } from "@/app/lib/company";

function CompanyRow({company}:{company:Company}) {
    return (
        <tr>
            <td>{company.ekultur_id}</td>
            <td>{company.name}</td>
            <td>{company.short_name}</td>
            <td>{company.isMember ? 'Yes' : 'No'}</td>
        </tr>
    );
}

export function ContactCard({contact}:{contact:Contact}) {
    if(contact.companies.length == 0){
        return(
            <div key={contact.id} className='bg-white rounded-xl shadow-md p-2 shadow-black'>
                <div className="w-fill text-center" key={contact.id}>
                    <h1><b>#{contact.id}</b> - {contact.name}</h1>
                    <h2>{contact.email} - {contact.phone}</h2>
                </div>
                <h2>Contact is not attached to any companies</h2>
            </div>
        );
    }
    else{
        return (
            <div className='bg-white rounded-xl shadow-md p-2 shadow-black'>
                <div className="w-fill text-center" key={contact.id}>
                    <h1><b>#{contact.id}</b> - {contact.name}</h1>
                    <h2>{contact.email} - {contact.phone}</h2>
                </div>
                <h2>Receives notices for:</h2>
                <table className="w-full text-sm text-left rtl:text-right text-black">
                    <thead className="text-sm font-bold text-white uppercase bg-gray-500">
                        <tr>
                            <th scope="col" className="px-4 py-1">eKultur ID</th>
                            <th scope="col" className="px-4 py-1">Name</th>
                            <th scope="col" className="px-4 py-1">Short-Name</th>
                            <th scope="col" className="px-4 py-1">Is Member</th>
                        </tr>
                    </thead>
                    <tbody>
                    {contact.companies.map(data => {
                        return ( <CompanyRow key={contact.id+'-'+data.id} company={Company.fromJSON(data)} /> );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}