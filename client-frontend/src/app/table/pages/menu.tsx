import { MenuItem } from "../interfaces/menu-item";

function addOrder(id: number) { // TODO: check if this is not rendered in the client side
  console.log("POST request to the backend (?) to order ");
}

function MenuItemCard({ item=null }:{ item:MenuItem|null }) {
  if (item === null) return null
  return (
    <div className='bg-indigo-500 rounded-lg m-4 flex justify-between'>
      <div className="bg-white flex m-4">
        <h1 className="m-4">({item.id})</h1>
        <h1 className="m-4">{item.name}</h1>
      </div>
      <div className="flex flex-row m-4">
        <h1 className="bg-white m-4 self-center">R${item.price.toFixed(2)}</h1>
        <button className="bg-white p-4" onClick={() => {addOrder(item.id)}}>Order</button>
      </div>
    </div>
  )
}

export default function Menu({ menuItems=[] }:{ menuItems:MenuItem[] }) {
  if (menuItems.length === 0) return null;
  
  const menuItemCards: React.JSX.Element[] = [];
  menuItems.forEach((m, i) => menuItemCards.push(<MenuItemCard key={i} item={m} />));

  return (
      <div>
          {menuItemCards}
      </div>
  );
}
