import styles from '@/app/ui/company.module.css';
import SearchBox from '@/app/lib/search'
import {CompanyGrid} from './companygrid'



export default function Page() {
  return (
    <>
    <SearchBox />
    <CompanyGrid />
    </>
  );
}