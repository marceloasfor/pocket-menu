import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners'
import { sendOrder } from "@/app/actions";
import Cookies from 'js-cookie';


function Summary({totalPrice, totalQuantity}) {
    const cart = useSelector((state:any) => state.cart)
    const [isLoading, setIsLoading] = useState(false);
    const token = Cookies.get("token") || "";

    const handleCheckout = async (token:string) => {
        setIsLoading(true)
        console.log("sending POST request to the backend (?) to order");
        const response = await sendOrder(token, cart)
        console.log(response);
        setIsLoading(false)
    }

    return (
        <>
            <div id="summary" className="w-1/4 px-8 py-10">
                <h1 className="font-semibold text-2xl border-b pb-8">Resumo</h1>

                <div className="flex justify-between mt-10">
                    <span className="font-semibold text-sm uppercase">Itens {totalQuantity}</span>
                    <span className="font-semibold text-sm">R$ {totalPrice}</span>
                </div>

                {/* <div>
                    <label className="font-medium inline-block mb-3 text-sm uppercase">Payment</label>
                    <select className="block p-2 text-gray-600 w-full text-sm">
                        <option>PIX</option>
                        <option>Cartão</option>
                        <option>Débito</option>
                        <option>Dinheiro</option>
                    </select>
                </div> */}

                <div className="border-t mt-8">
                    <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                        <span>Valor Total</span>
                        <span>R$ {totalPrice}</span>
                    </div>
                    {/* <button
                        className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
                        onClick={() => handleCheckout(token)}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ClipLoader color="white" size={20} />
                        ) : (
                            "Checkout"
                        )}
                    </button> */}
                </div>
            </div>
        </>
    )
}

export default Summary