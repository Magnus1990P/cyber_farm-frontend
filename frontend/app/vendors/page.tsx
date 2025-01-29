import styles from '@/app/ui/asset.module.css';
import SearchBox from '@/app/lib/search'
import {VendorGrid} from './vendorgrid'
import {NewVendor} from './vendor_create'

export default function Page() {
  return (
    <>
      <NewVendor />
      <VendorGrid />
    </>
  );
}