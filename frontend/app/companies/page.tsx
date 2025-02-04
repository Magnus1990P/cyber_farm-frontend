"use client";
import {CompanyGrid} from './companygrid'

import { msalConfig } from '@/app/lib/authConfig';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';

const msalInstance = new PublicClientApplication(msalConfig);

const MainContent = () => {
  return (
    <div className="App">
      <AuthenticatedTemplate>
        <CompanyGrid />
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <p className='text-xl'>UNAUTHORIZED</p>
      </UnauthenticatedTemplate>
    </div>
  );
};

export default function Page() {
  return (
    <>
      <MsalProvider instance={msalInstance}>
        <MainContent />
      </MsalProvider>
    </>
  );
}