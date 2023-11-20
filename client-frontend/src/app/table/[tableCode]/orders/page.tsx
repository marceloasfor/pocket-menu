"use client"

import CartItem from '@/components/Orders/CartItem'
import Summary from '@/components/Orders/Summary'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { BiArrowBack } from 'react-icons/bi';


export default function OrdersPage() {
    const { tableCode } = useParams();
    const [isClient, setIsClient] = useState(false)
    const cart = useSelector((state:any) => state.cart)

    const getTotalQuantity = () => {
        let total = 0
        cart.forEach((item:any) => {
            total += item.quantity
        })
        return total
    }

    const getTotalPrice = () => {
        let total = 0
        cart.forEach((item:any) => {
            total += item.quantity * item.price
        })
        return total
    }
 
    useEffect(() => {
        setIsClient(true)
    }, [])
    

    return (
        <div className="container mx-auto mt-10">
            <div className="flex shadow-md my-10">
                <div className="w-3/4 bg-white px-10 py-10">
                    <div className="flex justify-between border-b pb-8">
                        <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                        <h2 className="font-semibold text-2xl">{isClient ? getTotalQuantity() : '0'} Items</h2>
                    </div>
                    <div className="flex mt-10 mb-5">
                        <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Quantity</h3>
                        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Price</h3>
                        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Total</h3>
                    </div>
                    {isClient ?
                        cart?.map((item:any) => (
                            <CartItem
                                key={item.id}
                                id={item.id}
                                title={item.name}
                                price={item.price} 
                                quantity={item.quantity}
                            />
                        )) : <p>No items</p>
                    }

                    <Link href={`/table/${tableCode}/menu`} className="flex font-semibold text-indigo-600 text-sm mt-10">
                        <BiArrowBack className="fill-current mr-2 text-indigo-600 w-4"/>
                        Continue Shopping
                    </Link>
                </div>
                
                {isClient ? 
                    <Summary
                        totalPrice={getTotalPrice()}
                        totalQuantity={getTotalQuantity()}
                    />
                    :
                    <Summary
                        totalPrice={0}
                        totalQuantity={0}
                    />
                }

            </div>
        </div>
    )
}