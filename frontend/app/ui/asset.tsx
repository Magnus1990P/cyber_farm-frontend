import '@/app/ui/global.css';
import {Product} from '@/app/lib/asset';
import Link from "next/link";


export function AssetCard(props: {id: number; name: string; products: Product[];}) {
  return (
    <div
      key='{props.id}-vendor'
      className='bg-black bg-opacity-25' >
      <div className="w-fill text-center" key='{props.id}-asset_head'>
          <Link href={'/assets/'+props.id}><h1><b>#{props.id}</b> - {props.name}</h1></Link>
      </div>
      <table
          className='ww-fill table-auto border-separate border-spacing-x-2 text-sm font-light text-surface'
          key='{props.id}-table'>
        <thead><tr><th className='bg-lime-700'>#</th><th className='bg-lime-700'>Name</th></tr></thead>
        <tbody key='{props.id}-tbodt' >
          {props.products.map((pobj:Product) => {
              return (
                  <tr><td>{pobj.id}</td><td>{pobj.name}</td></tr>
              );
          })}
        </tbody>
      </table>
    </div>
  );
};

