'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
 
export default function ProductCard({products}) {
  return (
    <div className='flex justify-center grid gap-10 grid-cols-3 justify-items-center px-10'>
      {products.map((product) => {
        return (
          <div
            className="w-full rounded-md bg-white p-3 hover:bg-sky-100"
            key={product.name}>
            <h1>{product.name}</h1>
            <p className="hidden md:block">{product.vendor} - {product.companies}</p>
            <UserGroupIcon width={100} ></UserGroupIcon>
          </div>
        );
      })}
    </div>
  );
}
