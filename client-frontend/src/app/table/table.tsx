"use client";

import { useContext, useEffect, useState } from 'react';

import { ModalContext } from '../contexts/modal';

import Header from './header';

import Users from './pages/users';
import Orders from './pages/orders';
import Menu from './pages/menu';
import { useSearchParams } from 'next/navigation';
import { getAllMenuItems, getAllOrders, getAllUsers } from '../utils/call';


export default async function Table() {
  const searchParams = useSearchParams()
  const { modal } = useContext(ModalContext);

  const [verificationCode, setVerificationCode] = useState(searchParams.get("c") || "");
  const [restaurant, setRestaurant] = useState(searchParams.get("r") || "");
  const [name, setName] = useState(searchParams.get("n") || "");

  const [usersData, setUsersData] = useState(await getAllUsers(verificationCode));
  const [ordersData, setOrdersData] = useState(await getAllOrders(verificationCode));
  const [menuData, setMenuData] = useState(await getAllMenuItems(restaurant));

  const [shown, setShown] = useState<React.JSX.Element>(<Users users={usersData} />);
  const changePage = async (newShown: string) => {
    switch(newShown) {
      case "users": {
        setUsersData(await getAllUsers(verificationCode));
        setShown(<Users users={usersData} />);
      } break;
      case "orders": {
        setOrdersData(await getAllOrders(verificationCode));
        setShown(<Orders orders={ordersData} />);
      } break;
      case "menu": {
        setMenuData(await getAllMenuItems(verificationCode));
        setShown(<Menu menuItems={menuData} />);
      } break;
    }
  }
  
  return (
    <div className='h-screen'>
      <Header code={verificationCode} />
      <div className='overflow-y-auto pb-20 pt-16 self-start'>
        {shown}
      </div>
      <div className='bg-white fixed flex flex-row gap-4 p-4 inset-x-0 bottom-0 z-10'>
        <button className='bg-indigo-500 h-10 basis-1/3 rounded-lg' onClick={() => changePage("users")}>Users</button>
        <button className='bg-indigo-500 h-10 basis-1/3 rounded-lg' onClick={() => changePage("orders")}>Orders</button>
        <button className='bg-indigo-500 h-10 basis-1/3 rounded-lg' onClick={() => changePage("menu")}>Menu</button>
      </div>
      {modal}
    </div>
  );
}
