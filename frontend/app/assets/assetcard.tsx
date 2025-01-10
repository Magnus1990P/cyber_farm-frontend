import '@/app/ui/global.css';
import {Product} from '@/app/lib/product';
import Link from "next/link";


export function AssetCard(props: {id: number; name: string; products: Product[];}) {
  return (
    <div key={'vendor'+props.id} className='bg-black bg-opacity-25' >
      <div className="w-fill text-center" key={'asset_head-'+props.id}>
          <Link href={'/assets/'+props.id}><h1><b>#{props.id}</b> - {props.name}</h1></Link>
      </div>
      <table className='ww-fill table-auto border-separate border-spacing-x-2 text-sm font-light text-surface'>
        <thead>
          <tr><th className='bg-lime-700'>#</th><th className='bg-lime-700'>Name</th></tr>
        </thead>
        <tbody>
          {props.products.map((pobj:Product) => {
              return (
                  <tr key={pobj.id}><td>{pobj.id}</td><td>{pobj.name}</td></tr>
              );
          })}
        </tbody>
      </table>
    </div>
  );
};

