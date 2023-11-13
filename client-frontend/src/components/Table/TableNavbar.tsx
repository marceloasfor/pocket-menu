"use client";

import Link from 'next/link';
import { useParams, usePathname  } from 'next/navigation';

export default async function TableNavbar() {  

  const { tableCode } = useParams();
  const pathname = usePathname();
  
  return (
    <div className='fixed bottom-0 left-0 right-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600'>
      <div className='grid h-full max-w-lg grid-cols-4 mx-auto font-medium'>
  
        <Link 
          className={`inline-flex flex-col items-center justify-center px-5 group ${ pathname == `/table/${tableCode}/users` ? "active_navlink" : "navlink" }`}
          href={`/table/${tableCode}/users`}>
            <svg 
              className={`w-5 h-5 mb-2 ${ pathname == `/table/${tableCode}/users` ? "active_navlink_item" : "navlink_item" }`} 
              aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
            </svg>
            <span className={`text-lg ${ pathname == `/table/${tableCode}/users` ? "active_navlink_item" : "navlink_item" }`}>
              Users
            </span>
        </Link>

        <Link 
          className={`inline-flex flex-col items-center justify-center px-5 group ${ pathname == `/table/${tableCode}/orders` ? "active_navlink" : "navlink" }`}
          href={`/table/${tableCode}/orders`}>
            <svg 
              className={`w-5 h-5 mb-2 ${ pathname == `/table/${tableCode}/orders` ? "active_navlink_item" : "navlink_item" }`} 
              aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 30 30">
                <path d="m25.414 14-6.707-6.707-1.414 1.414L22.586 14H9.414l5.293-5.293-1.414-1.414L6.586 14H4l2 14h20l2-14h-2.586zm-1.149 12H7.735L6.306 16h19.388l-1.429 10zM11 20H9v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-12 4H9v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/>
            </svg>
            <span className={`text-lg ${ pathname == `/table/${tableCode}/orders` ? "active_navlink_item" : "navlink_item" }`}>
              Orders
            </span>
        </Link>

        <Link 
          className={`inline-flex flex-col items-center justify-center px-5 group ${ pathname == `/table/${tableCode}/menu` ? "active_navlink" : "navlink" }`}
          href={`/table/${tableCode}/menu`}>
            <svg 
              className={`w-5 h-5 mb-2 ${ pathname == `/table/${tableCode}/menu` ? "active_navlink_item" : "navlink_item" }`} 
              aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 15 15">
                <path d="M3.5,0l-1,5.5c-0.1464,0.805,1.7815,1.181,1.75,2L4,14c-0.0384,0.9993,1,1,1,1s1.0384-0.0007,1-1L5.75,7.5&#xA;&#x9;c-0.0314-0.8176,1.7334-1.1808,1.75-2L6.5,0H6l0.25,4L5.5,4.5L5.25,0h-0.5L4.5,4.5L3.75,4L4,0H3.5z M12,0&#xA;&#x9;c-0.7364,0-1.9642,0.6549-2.4551,1.6367C9.1358,2.3731,9,4.0182,9,5v2.5c0,0.8182,1.0909,1,1.5,1L10,14c-0.0905,0.9959,1,1,1,1&#xA;&#x9;s1,0,1-1V0z"/>
            </svg>
            <span className={`text-lg ${ pathname == `/table/${tableCode}/menu` ? "active_navlink_item" : "navlink_item" }`}>
              Menu
            </span>
        </Link>

      </div>
    </div>
  );
}
