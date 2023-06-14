import { Order } from "../interfaces/order";

function OrderCard({ order=null }:{ order:Order|null }) {
    if (order === null) return null
    return (
        <div className='bg-indigo-500 rounded-lg m-4 flex justify-between'>
            <div className="bg-white flex m-4">
                <h1 className="m-4">({order.itemId})</h1>
                <h1 className="m-4">{order.name}</h1>
            </div>
            <h1 className="bg-white m-8 self-center">{order.price}</h1>
        </div>
    )
}

export default function Orders({ orders=[] }:{ orders:Order[] }) {
  if (orders.length === 0) return null;

  const orderCards: React.JSX.Element[] = [];
  orders.forEach((o, i) => orderCards.push(<OrderCard key={i} order={o} />));

  return (
      <div>
          {orderCards}
      </div>
  );
}
