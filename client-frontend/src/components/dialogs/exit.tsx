
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { exitTable } from "../../app/actions";
import { destroyCookie } from "nookies";
import { useDispatch } from 'react-redux'
import { resetCart } from '@/redux/features/cart-slice'

import { useUser } from "@/contexts/UserContext";

export default function ExitDialog({ setModal, token }:{ setModal:Dispatch<SetStateAction<JSX.Element | null>>, token:string }) {
    const router = useRouter();
    // const {tableCode} = useParams();
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    
    const exit = async (token:string) => {
        setLoading(true)

        try {
            console.log("exit token: " + token)
            const res = await exitTable(token) || [];

            const { error } = res;
            if (error) {
                throw new Error(error);
            };

            dispatch(resetCart());

            destroyCookie({}, "restaurant", {path: `/`});
            destroyCookie({}, "verification_code", {path: `/`});
            destroyCookie({}, "token", {path: '/'});
            destroyCookie({}, "username", {path: '/'});

            router.push(`/`);
        } catch (err) {
            console.error(err);
            throw err
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="backdrop-brightness-50 bg-white/30 grid absolute inset-0 h-screen w-screen items-center z-50">
            <div className="bg-white grid gap-4 justify-items-center text-center m-auto p-12 rounded-sm">
                <p>Tem certeza que deseja sair da mesa virtual?</p>
                <div className="flex gap-4">
                    <button 
                        className='bg-indigo-500 h-10 w-20 rounded-lg' 
                        disabled={loading} 
                        onClick={() => exit(token)}
                    >Sim</button>
                    <button 
                        className='bg-indigo-500 h-10 w-20 rounded-lg' 
                        disabled={loading} 
                        onClick={() => setModal(null)}
                    >Não</button>
                </div>
            </div>
        </div>
    )
}