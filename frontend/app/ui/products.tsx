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
    <>
      {products.map((product) => {
        return (
          <div
            className="card flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
            key={product.name}>
            <h1>{product.name}</h1>
            <p className="hidden md:block">{product.vendor} - {product.companies}</p>
          </div>
        );
      })}
    </>
  );
}