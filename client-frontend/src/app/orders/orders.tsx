// "use client";

import { Order } from "../interfaces/order";

function OrderCard({ order }:{ order:Order }) {
    if (order === null) return null
    return (
        <div className='bg-yellow-300 rounded-lg m-4 flex justify-between'>
            <div className="flex m-4">
                <h1 className="m-4">({order.itemId})</h1>
                <h1 className="m-4">{order.name}</h1>
            </div>
            <h1 className="m-8 self-center">R${order.price?.toFixed(2)}</h1>
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
