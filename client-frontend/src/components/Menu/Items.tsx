import React from 'react';
import { addOrder } from "@/app/actions";

async function orderItem(token:string, id:number) { // TODO: check if this is not rendered in the client side
    console.log("POST request to the backend (?) to order ");
    console.log(await addOrder(token, id)); // add feedback
}

const Menu = ({ items, token }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
      {items.map((menuItem) => {
        const { id, category, name, img, description, price } = menuItem;
        return (
          <div key={id} className="bg-white border border-gray-100 p-4 rounded-lg relative shadow-lg">
            <span className="text-red-600 bg-red-100 border border-red-500 rounded-full text-primary text-sm px-4 py-1 inline-block mb-4">{category.name}</span>
            {/* <img src={img} alt={name} className="photo" /> */}
            <div className="flex flex-col items-center my-3 space-y-2">
              <h1 className="text-gray-900 text-3xl">{name}</h1>
              <p className="text-gray-500 text-md text-center">{description}</p>
              <h2 className="text-gray-900 text-2xl font-bold">R${price}</h2>
              <button 
                className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 px-8 py-2 rounded-full mt-24 text-white"
                onClick={() => {orderItem(token, id)}}
              >Order</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Menu;