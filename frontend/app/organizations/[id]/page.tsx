import styles from '@/app/ui/organization.module.css';
import {OrganizationsPanel} from '@/app/lib/organization'
import { use } from 'react';


export default function Page({ params }:{params:any}) {
  const { id } = params; // Access the dynamic parameter 'id'

  console.log(id)
  return (
    <>
    <div key="id">{id}</div>
    <OrganizationsPanel id={id} />
    </>
  );
}