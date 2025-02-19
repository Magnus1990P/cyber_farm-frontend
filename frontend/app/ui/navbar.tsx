'use client';

import Link from 'next/link';
import '@/app/ui/global.css';
import { TfiHome, TfiDashboard, TfiUser, TfiBriefcase } from 'react-icons/tfi';

export default function NavBar() {
  const links = [
      {name: "Home",          href:"/",               icon: TfiHome},
      {name: "Organization",  href:"/organizations",  icon: TfiBriefcase},
      {name: "Companies",     href:"/companies",      icon: TfiDashboard},
      {name: "Contacts",      href:"/contacts",       icon: TfiUser},
      {name: "Vendors",       href:"/vendors",        icon: TfiBriefcase}
  ];

  return (
    <div className="flex-nowrap flex-col columns-6 justify-center relative top-0 left-0 w-full bg-white bg-opacity-150 text-black text-2xl md:p-5 md:mb-5 font-mono font-bold" >
      <p className='text-left font-mono text-black font-extrabold'>
        CyberFarm
      </p>
      
      <ul className='col-span-4 items-center'>
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