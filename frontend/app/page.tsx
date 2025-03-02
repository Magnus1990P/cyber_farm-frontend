"use client";

import Image from 'next/image';
import { useState } from 'react';


const MainContent = () => {
  return (
      <div className="">
        <Image 
          src='/cyber-security.png'
          alt='Cyber security icons created by Eucalyp - Flaticon'
          width={500}
          height={500}
        />
        <p className='font-extrabold font-mono text-7xl'>
          CyberFarm CMDB
        </p>
      </div>
  );
};


export default function Page() {
  return (
    <div className='w-fit justify-center mx-auto my-32'>
      <MainContent />
    </div>
  );
}