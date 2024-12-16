'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import '@/app/ui/global.css';
import clsx from 'clsx';
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
 
export default function NavBar() {
  const pathname = usePathname(); 
  const links = [{name: "asdas",        href:"/",                     icon: UserGroupIcon},
                 {name: "asdasd",       href:"/dashboard",            icon: HomeIcon},
                 {name: "asdasasdd",    href:"/dashboard/customers",  icon: DocumentDuplicateIcon},
                 {name: "assdasasdd",   href:"/dashboard/invoices",   icon: DocumentDuplicateIcon}];
  return (
    <nav 
      className="flex-container ">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className=""
          >
            <LinkIcon className="w-8" />
            <p className="">{link.name}</p>
          </Link>
        );
      })}
    </nav>
  );
}

