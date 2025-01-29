import styles from '@/app/ui/organization.module.css';
import SearchBox from '@/app/lib/search'
import {OrganizationsGrid} from './organizationgrid'
import {CreateOrganization} from './create_organization'

export default function Page() {
  return (
    <>
      <CreateOrganization />
      <OrganizationsGrid />
    </>
  );
}