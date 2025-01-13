import styles from '@/app/ui/asset.module.css';
import SearchBox from '@/app/lib/search';
import {ContactGrid} from './contactgrid';

export default function Page() {
  return (
    <>
      <SearchBox />
      <ContactGrid />
    </>
  );
}