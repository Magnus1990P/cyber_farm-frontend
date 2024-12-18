'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from "react";
import '@/app/ui/global.css';
import clsx from 'clsx';
import { TfiHome, TfiDashboard } from 'react-icons/tfi';

export default function NavBar() {
  const pathname = usePathname(); 
  const links = [{name: "Home",        href:"/",                     icon: TfiHome},
                 {name: "Dashboard",       href:"/dashboard",            icon: TfiDashboard},
                 {name: "Dash Customers",    href:"/dashboard/customers",  icon: TfiDashboard},
                 {name: "Dash Invoices",   href:"/dashboard/invoices",   icon: TfiDashboard}];
  const [nav, setNav] = useState(false);

  return (
    <ul
      className="flex flex-row justify-top items-center relative top-0 left-0 w-full text-gray-200"
      >
      {links.map((link) => (
        <li
          key={link.name}
          className="nav-links px-10 cursor-pointer capitalize font-Large text-gray-500 hover:scale-105 hover:text-green duration-200 link-underline" >
            <Link href={link.href}><link.icon /> {link.name}</Link>
        </li>
      ))}
    </ul>
  )
}