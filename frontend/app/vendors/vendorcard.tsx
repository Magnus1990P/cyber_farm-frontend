import {Vendor} from '@/app/lib/vendor';
import {Product} from '@/app/lib/product';
import Link from "next/link";

function ProductRow({product}:{product:Product}) {
  return (
      <tr key={product.id}>
          <td>{product.id}</td>
          <td>{product.name}</td>
      </tr>
  );
}

export function VendorCard({vendor}:{vendor:Vendor}) {
  return (
    <div key={'vendor'+vendor.id} className='bg-white shadow-md shadow-black rounded-md' >
      <div className="w-fill text-center" key={'asset_head-'+vendor.id}>
          <Link href={'/vendors/'+vendor.id}>
            <p className='font-bold text-2xl'>#{vendor.id} - {vendor.name}</p>
          </Link>
      </div>
      <table key={vendor.id} className="w-full text-sm text-left rtl:text-right text-black">
        <thead className="text-sm font-bold text-white uppercase bg-gray-500">
          <tr>
            <th scope="col" className="px-2 py-1">#</th>
            <th scope="col" className="px-4 py-1">Name</th>
          </tr>
        </thead>
        <tbody>
          {vendor.products.map((product:Product) => {
              return ( <ProductRow key={product.id} product={product} /> );
          })}
        </tbody>
      </table>
    </div>
  );
};

