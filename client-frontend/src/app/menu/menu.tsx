"use client";

import { addOrder } from "../actions";
import { MenuItem } from "../interfaces/menu-item";

async function orderItem(token:string, id:number) { // TODO: check if this is not rendered in the client side
  console.log("POST request to the backend (?) to order ");
  console.log(await addOrder(token, id)); // add feedback
}

function MenuItemCard({ item=null, token }:{ item:MenuItem|null, token:string }) {
  if (item === null) return null
  return (
    <div className='bg-indigo-500 rounded-lg m-4 flex justify-between'>
      <div className="bg-white flex m-4">
        <h1 className="m-4">({item.id})</h1>
        <h1 className="m-4">{item.name}</h1>
      </div>
      <div className="flex flex-row m-4">
        <h1 className="bg-white m-4 self-center">R${item.price}</h1>
        <button className="bg-white p-4" onClick={() => {orderItem(token, item.id)}}>Order</button>
      </div>
    </div>
  )
}

export default function Menu({ menuItems=[], token="" }:{ menuItems:MenuItem[], token:string }) {
  if (menuItems.length === 0) return null;
  
  const menuItemCards: React.JSX.Element[] = [];
  menuItems.forEach((m, i) => menuItemCards.push(<MenuItemCard key={i} item={m} token={token} />));

  return (
      <div>
          {menuItemCards}
      </div>
  );
}
