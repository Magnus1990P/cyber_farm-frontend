import styles from '@/app/ui/asset.module.css';
import SearchBox from '@/app/lib/search'
import {ContactGrid} from '@/app/lib/contact'

export default function Page() {
  return (
    <>
      <SearchBox />
      <ContactGrid />
    </>
  );
}