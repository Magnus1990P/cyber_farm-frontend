'use client';

import Link from 'next/link';
import '@/app/ui/global.css';
import { TfiHome, TfiDashboard, TfiUser, TfiBriefcase } from 'react-icons/tfi';

import { SignInButton, SignOutButton } from '@/app/ui/AuthButton';

import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { msalConfig } from '@/app/lib/authConfig';

const msalInstance = new PublicClientApplication(msalConfig);

const AuthButton = () => {
  return (
    <>
      <AuthenticatedTemplate>
        <SignOutButton /> 
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <SignInButton />
      </UnauthenticatedTemplate>
    </>
  );
};

export default function NavBar() {
  const links = [
      {name: "Home",          href:"/",               icon: TfiHome},
      {name: "Organization",  href:"/organizations",  icon: TfiBriefcase},
      {name: "Companies",     href:"/companies",      icon: TfiDashboard},
      {name: "Contacts",      href:"/contacts",       icon: TfiUser},
      {name: "Vendors",       href:"/vendors",        icon: TfiBriefcase}
  ];

  return (
    <div className="flex-nowrap flex-row justify-center relative top-0 left-0 w-full bg-white bg-opacity-150 text-black text-2xl md:p-5 md:mb-5" >
      <ul className='flex flex-row items-center'>
        <li>
          <MsalProvider instance={msalInstance}>
            <AuthButton />
          </MsalProvider>
        </li> 
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