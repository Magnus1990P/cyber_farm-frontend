import styles from '@/app/ui/asset.module.css';
import SearchBox from '@/app/lib/search'
import {AssetGrid} from '@/app/lib/asset'

export default function Page() {
  return (
    <>
      <SearchBox />
      <AssetGrid />
    </>
  );
}