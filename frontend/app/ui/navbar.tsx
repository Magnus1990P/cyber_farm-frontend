'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import '@/app/ui/global.css';
import { TfiHome, TfiDashboard, TfiMenu, TfiUser, TfiBriefcase, TfiPanel } from 'react-icons/tfi';

export default function NavBar() {
  const pathname = usePathname(); 
  const links = [
      {name: "Home",          href:"/",                    icon: TfiHome},
      {name: "Organization",  href:"/dashboard",           icon: TfiDashboard},
      {name: "Companies",     href:"/companies",           icon: TfiDashboard},
      {name: "Contacts",      href:"/dashboard/customers",  icon: TfiUser},
      {name: "Products",      href:"/dashboard/invoices",     icon: TfiBriefcase}
  ];

  return (
    <div
      className="flex flex-nowrap flex-row justify-center relative top-0 left-0 w-full bg-white bg-opacity-150 text-black text-2xl md:p-5 md:mb-5"
    >
      <ul className='flex flex-row items-center'>
        {links.map((link) => (
          <li
            key={link.name}
            className="nav-links md:px-5 hover:font-underline duration-200 hover:link-underline"
          >
              <Link href={link.href}><link.icon className='inline'/> {link.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}