// "use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default async function Navigation() {
  // const router = useRouter();
  
  return (
    // the outer div adds a lot of useless space, but avoids a bug with the bg color
    <div className='bg-gray-900 h-screen'>
      <div className='bg-gray-900 fixed flex flex-row gap-4 p-4 inset-x-0 bottom-0 z-10'>
        {/* <button className='bg-orange-500 h-10 basis-1/3 rounded-lg' onClick={() => router.push(`/users`)}>Users</button>
        <button className='bg-orange-500 h-10 basis-1/3 rounded-lg' onClick={() => router.push(`/orders`)}>Orders</button>
        <button className='bg-orange-500 h-10 basis-1/3 rounded-lg' onClick={() => router.push(`/menu`)}>Menu</button> */}
        <Link className='bg-orange-500 flex justify-center items-center h-10 basis-1/3 rounded-lg' href='/users'>Users</Link>
        <Link className='bg-orange-500 flex justify-center items-center h-10 basis-1/3 rounded-lg' href='/orders'>Orders</Link>
        <Link className='bg-orange-500 flex justify-center items-center h-10 basis-1/3 rounded-lg' href='/menu'>Menu</Link>
      </div>
    </div>
  );
}
