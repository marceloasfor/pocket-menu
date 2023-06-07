"use client";

import { useContext, useEffect, useState } from 'react';

import { ModalContext } from '../contexts/modal';
import Orders from '../orders/orders';
import Menu from './menu';
import { useRouter, useSearchParams } from 'next/navigation';
import { getAllMenuItems, getAllOrders, getAllUsers } from '../actions';
import Header from '../header';
import { MenuItem } from '../interfaces/menu-item';


export default async function Table({ menuItems, verificationCode }:{ menuItems:MenuItem[], verificationCode:string }) {
  const router = useRouter();
  const { modal } = useContext(ModalContext);
  
  return (
    <div className='h-screen'>
      <div className='overflow-y-auto pb-20 pt-16 self-start'>
        <Menu menuItems={menuItems} verificationCode={verificationCode} />
      </div>
      <div className='bg-white fixed flex flex-row gap-4 p-4 inset-x-0 bottom-0 z-10'>
        <button className='bg-indigo-500 h-10 basis-1/3 rounded-lg' onClick={() => router.push(`/users`)}>Users</button>
        <button className='bg-indigo-500 h-10 basis-1/3 rounded-lg' onClick={() => router.push(`/orders`)}>Orders</button>
        <button className='bg-indigo-500 h-10 basis-1/3 rounded-lg' onClick={() => {}}>Menu</button>
      </div>
      {/* {modal} */}
    </div>
  );
}
