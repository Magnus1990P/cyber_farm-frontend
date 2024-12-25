import styles from '@/app/ui/organization.module.css';
import SearchBox from '@/app/lib/search'
import {OrganizationsGrid} from '@/app/lib/organization'

export default function Page() {
  return (
    <>
    <SearchBox />
    <OrganizationsGrid />
    </>
  );
}