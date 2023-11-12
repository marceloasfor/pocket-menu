"use client";

import Link from 'next/link';
import { useParams, usePathname  } from 'next/navigation';
import { BiBasket, BiRestaurant, BiSolidUserCircle } from 'react-icons/bi';

export default async function TableNavbar() {  

  const { tableCode } = useParams();
  const pathname = usePathname();
  
  return (
    <div className='fixed bottom-0 left-0 right-0 w-full h-16 bg-white border-t border-gray-200'>
      <div className='grid grid-cols-3 h-full max-w-lg mx-auto font-medium'>
  
        <Link 
          className={`inline-flex flex-col items-center justify-center px-5 group ${ pathname == `/table/${tableCode}/users` ? "active_navlink" : "navlink" }`}
          href={`/table/${tableCode}/users`}>
            <BiSolidUserCircle className={`w-6 h-6 mb-2 ${ pathname == `/table/${tableCode}/users` ? "active_navlink_item" : "navlink_item" }`} />
            <span className={`text-lg ${ pathname == `/table/${tableCode}/users` ? "active_navlink_item" : "navlink_item" }`}>
              Users
            </span>
        </Link>

        <Link 
          className={`inline-flex flex-col items-center justify-center px-5 group ${ pathname == `/table/${tableCode}/orders` ? "active_navlink" : "navlink" }`}
          href={`/table/${tableCode}/orders`}>
            <BiBasket className={`w-6 h-6 mb-2 ${ pathname == `/table/${tableCode}/orders` ? "active_navlink_item" : "navlink_item" }`} />
            <span className={`text-lg ${ pathname == `/table/${tableCode}/orders` ? "active_navlink_item" : "navlink_item" }`}>
              Orders
            </span>
        </Link>

        <Link 
          className={`inline-flex flex-col items-center justify-center px-5 group ${ pathname == `/table/${tableCode}/menu` ? "active_navlink" : "navlink" }`}
          href={`/table/${tableCode}/menu`}>
            <BiRestaurant className={`w-6 h-6 mb-2 ${ pathname == `/table/${tableCode}/menu` ? "active_navlink_item" : "navlink_item" }`} />
            <span className={`text-lg ${ pathname == `/table/${tableCode}/menu` ? "active_navlink_item" : "navlink_item" }`}>
              Menu
            </span>
        </Link>

      </div>
    </div>
  );
}
