"use client";

import { useRouter } from 'next/navigation';

export default async function Navigation() {
  const router = useRouter();
  
  return (
    <div className='h-screen'>
      <div className='bg-white fixed flex flex-row gap-4 p-4 inset-x-0 bottom-0 z-10'>
        <button className='bg-indigo-500 h-10 basis-1/3 rounded-lg' onClick={() => router.push(`/users`)}>Users</button>
        <button className='bg-indigo-500 h-10 basis-1/3 rounded-lg' onClick={() => router.push(`/orders`)}>Orders</button>
        <button className='bg-indigo-500 h-10 basis-1/3 rounded-lg' onClick={() => router.push(`/menu`)}>Menu</button>
      </div>
    </div>
  );
}
