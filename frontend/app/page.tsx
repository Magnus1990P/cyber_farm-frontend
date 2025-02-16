"use client";

import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { msalConfig } from '@/app/lib/authConfig';

const msalInstance = new PublicClientApplication(msalConfig);


const MainContent = () => {
  return (
      <div className="App">
          <AuthenticatedTemplate>
            <p className='text-center text-xl'>AUTHENTICATED - </p>
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            <p className='text-center text-xl'>UNAUTHENTICATED</p>
          </UnauthenticatedTemplate>
      </div>
  );
};


export default function Page() {
  return (
    <div className='max-w-md mx-auto'>
      <MsalProvider instance={msalInstance}>
        <MainContent />
      </MsalProvider>
    </div>
  );
}