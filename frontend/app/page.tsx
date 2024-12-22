import styles from '@/app/ui/home.module.css';
import SearchBox from '@/app/lib/search'

export default function Page() {
  return (
    <div className='max-w-md mx-auto'>
      <SearchBox />
    </div>
);
}