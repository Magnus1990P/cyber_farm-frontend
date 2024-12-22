import styles from '@/app/ui/organization.module.css';
import OrganizationCard from '@/app/ui/organization';
import SearchBox from '@/app/lib/search'
import {Organization} from '@/app/lib/organization'


async function OrganizationCard_dup() {
  const data = await fetch('http://localhost:8000/organizations/?index=false');
  const organizations = await data.json();
  return (
    <div className='flex grid justify-center auto-rows-auto md:grid-cols-4 mx-5 gap-5' key='organization'>
    {organizations.map((data) => {
        var org = Organization.fromJSON(data);
      return(
        <OrganizationCard org={org} />
      )
    })}
    </div>
  )
}

export default function Page() {
  return (
    <>
    <SearchBox />
    <OrganizationCard_dup />
    </>
  );
}