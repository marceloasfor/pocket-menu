import { addOrder } from "../actions";
import { MenuItem } from "../interfaces/menu-item";

async function orderItem(verificationCode:string, id:number) { // TODO: check if this is not rendered in the client side
  console.log("POST request to the backend (?) to order ");
  await addOrder(verificationCode, id);
}

function MenuItemCard({ item=null, verificationCode="" }:{ item:MenuItem|null, verificationCode:string }) {
  if (item === null) return null
  return (
    <div className='bg-indigo-500 rounded-lg m-4 flex justify-between'>
      <div className="bg-white flex m-4">
        <h1 className="m-4">({item.id})</h1>
        <h1 className="m-4">{item.name}</h1>
      </div>
      <div className="flex flex-row m-4">
        <h1 className="bg-white m-4 self-center">R${item.price.toFixed(2)}</h1>
        <button className="bg-white p-4" onClick={() => {orderItem(verificationCode, item.id)}}>Order</button>
      </div>
    </div>
  )
}

export default function Menu({ menuItems=[], verificationCode="" }:{ menuItems:MenuItem[], verificationCode:string }) {
  if (menuItems.length === 0) return null;
  
  const menuItemCards: React.JSX.Element[] = [];
  menuItems.forEach((m, i) => menuItemCards.push(<MenuItemCard key={i} item={m} verificationCode={verificationCode} />));

  return (
      <div>
          {menuItemCards}
      </div>
  );
}
