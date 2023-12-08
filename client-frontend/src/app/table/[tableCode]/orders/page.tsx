"use client"

import CartItem from '@/components/Orders/CartItem'
import Summary from '@/components/Orders/Summary'
import Link from 'next/link'
import { useFetch } from '@/hooks/useFetch'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
import { BiArrowBack } from 'react-icons/bi';
import Cookies from 'js-cookie'

// import {SERVER_URL} from '@/config'
import { backendURL } from "@/app/api/auth/[...nextauth]/route"

export default function OrdersPage() {
    const { tableCode } = useParams();
    const [isClient, setIsClient] = useState(false)
    // const cart = useSelector((state:any) => state.cart)
    const token = Cookies.get("token") || "";
    const apiUrl = backendURL + '/order/active/'
    const refreshInterval = 5000;
    const fetchOptions = {
        // mode: 'no-cors',
        method: 'GET',
        headers: {
            "Authorization" : `Bearer ${token}`,
            "Content-type" : "application/json",
        }
    }

    const { data, error } = useFetch(apiUrl, fetchOptions, refreshInterval);

    if (data) {
        console.log(data)
    }

    const getTotalPrice = () => {
        let price = 0
        data?.items.forEach((item:any) => {
            price += item.quantity * item.price
        })
        return price.toFixed(2)
    }
    const getTotalQuantity = () => {
        let quantity = 0
        data?.items.forEach((item:any) => {
            quantity += item.quantity
        })
        return quantity
    }

    useEffect(() => {
        setIsClient(true)
    }, [])


    return (
        <div className="container mx-auto mb-20">
            <div className="overflow-y-auto self-start flex shadow-md">
                <div className="w-3/4 bg-white px-10 py-10">
                    <div className="flex justify-between border-b pb-8">
                        <h1 className="font-semibold text-2xl">Meus Pedidos</h1>
                        <h2 className="font-semibold text-2xl">{isClient ? getTotalQuantity() : '0'} Itens</h2>
                    </div>
                    <div className="flex mt-10 mb-5">
                        <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Detalhes do Pedido</h3>
                        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Quantidade</h3>
                        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Preço</h3>
                        {/* <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Total</h3> */}
                    </div>
                    {isClient && data?.items.length ?
                        data?.items.map((item:any) => (
                            <CartItem
                                key={item.id}
                                title={item.name}
                                price={item.price}
                                quantity={item.quantity}
                            />
                        )) : <p>Nenhum pedido.</p>
                    }

                    <Link href={`/table/${tableCode}/menu`} className="flex font-semibold text-indigo-600 text-sm mt-20">
                        <BiArrowBack className="fill-current mr-2 text-indigo-600 w-4"/>
                        Voltar ao Cardápio
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