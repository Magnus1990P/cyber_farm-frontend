import React from "react";
import { useMsal } from "@azure/msal-react";
import { TfiMicrosoft, TfiUser } from 'react-icons/tfi';
import { loginRequest } from "@/app/lib/authConfig";


export const SignInButton = () => {
    const { instance } = useMsal();

    const handleLogin = (loginType) => {
        instance.loginRedirect(loginRequest).catch(e => {
            console.log(e);
        });
    }
    
    return (
        <button
              className='inline text-orange font-mono rounded-lg text-xl px-3 mr-5 py-1 bg-gray-300 hover:bg-gray-500 focus:ring-gray-700 border-gray-700'
              onClick={() => handleLogin()} >
                <TfiMicrosoft className="inline" /> Sign In
        </button>
    )
}

export const SignOutButton = () => {
    const { instance } = useMsal();

    const handleLogout = (logoutType) => {
        instance.logoutRedirect({ postLogoutRedirectUri: "/", });
    }

    return (
        <button
              className='text-orange font-mono rounded-lg px-3 mr-5 py-1 bg-gray-300 hover:bg-gray-500 focus:ring-gray-700 border-gray-700'
              onClick={() => handleLogout()} >
                Sign Out
        </button>
    )
}