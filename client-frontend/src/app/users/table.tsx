"use client";

import { useContext, useEffect, useState } from 'react';

import { ModalContext } from '../contexts/modal';

import Header from '../header';

import Users from './users';
import { useRouter } from 'next/navigation';
import { User } from '../interfaces/user';

export default async function Table({ users, verificationCode }:{ users:User[], verificationCode:string }) {
  const router = useRouter();
  const { modal } = useContext(ModalContext);
  
  return (
    <div className='h-screen'>
      <Header code={verificationCode} />
      <div className='overflow-y-auto pb-20 pt-16 self-start'>
        <Users users={users} />
      </div>
      <div className='bg-white fixed flex flex-row gap-4 p-4 inset-x-0 bottom-0 z-10'>
        <button className='bg-indigo-500 h-10 basis-1/3 rounded-lg' onClick={() => {}}>Users</button>
        <button className='bg-indigo-500 h-10 basis-1/3 rounded-lg' onClick={() => router.push(`/orders`)}>Orders</button>
        <button className='bg-indigo-500 h-10 basis-1/3 rounded-lg' onClick={() => router.push(`/menu`)}>Menu</button>
      </div>
      {/* {modal} */}
    </div>
  );
}
// "use client";

// import { useContext, useEffect, useState } from 'react';

// import { ModalContext } from '../contexts/modal';

// import Header from './header';

// import Users from './pages/users';
// import Orders from '../orders/orders';
// import Menu from '../menu/menu';
// import { useSearchParams } from 'next/navigation';
// import { Data } from './interfaces/data';


// export default async function Table({ data }:{ data:Data }) {
//   const { modal } = useContext(ModalContext);

//   const [shown, setShown] = useState<React.JSX.Element>(<Users users={data.users} />);
//   return (
//     <div className='h-screen'>
//       <Header code={data.verificationCode} />
//       <div className='overflow-y-auto pb-20 pt-16 self-start'>
//         {shown}
//       </div>
//       <div className='bg-white fixed flex flex-row gap-4 p-4 inset-x-0 bottom-0 z-10'>
//         <button className='bg-indigo-500 h-10 basis-1/3 rounded-lg' onClick={() => setShown(<Users users={data.users} />)}>Users</button>
//         <button className='bg-indigo-500 h-10 basis-1/3 rounded-lg' onClick={() => setShown(<Orders orders={data.orders} />)}>Orders</button>
//         <button className='bg-indigo-500 h-10 basis-1/3 rounded-lg' onClick={() => setShown(<Menu menuItems={data.menu} />)}>Menu</button>
//       </div>data.users
//       {modal}
//     </div>
//   );
// }