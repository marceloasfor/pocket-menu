"use client";

import { useContext, useEffect, useState } from 'react';

import { ModalContext } from '../contexts/modal';

import Orders from './orders';
import Menu from '../menu/menu';
import { useRouter, useSearchParams } from 'next/navigation';
import { getAllMenuItems, getAllOrders, getAllUsers } from '../actions';
import Header from '../header';
import { Order } from '../interfaces/order';


export default async function Table({ orders, verificationCode }:{ orders:Order[], verificationCode:string }) {
  const router = useRouter();
  const { modal } = useContext(ModalContext);
  
  return (
    <div className='h-screen'>
      <div className='overflow-y-auto pb-20 pt-16 self-start'>
        <Orders orders={orders} />
      </div>
      <div className='bg-white fixed flex flex-row gap-4 p-4 inset-x-0 bottom-0 z-10'>
        <button className='bg-indigo-500 h-10 basis-1/3 rounded-lg' onClick={() => router.push(`/users`)}>Users</button>
        <button className='bg-indigo-500 h-10 basis-1/3 rounded-lg' onClick={() => {}}>Orders</button>
        <button className='bg-indigo-500 h-10 basis-1/3 rounded-lg' onClick={() => router.push(`/menu`)}>Menu</button>
      </div>
      {/* {modal} */}
    </div>
  );
}
