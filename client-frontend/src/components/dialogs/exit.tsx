import { Dispatch, SetStateAction } from "react";
import { useRouter, useParams } from "next/navigation";
import { exitTable } from "../../app/actions";
import { destroyCookie } from "nookies";

import { useUser } from "@/contexts/UserContext";

export default function ExitDialog({ setModal, token }:{ setModal:Dispatch<SetStateAction<JSX.Element | null>>, token:string }) {
    const router = useRouter();
    // const {tableCode} = useParams();
    
    const exit = async (token:string) => {
        console.log("exit token: " + token)
        const res = await exitTable(token) || [];

        const { error } = res;
        if (error) {
          console.log(token);
          console.log(error);
          return null;
        };

        destroyCookie({}, "restaurant", {path: `/`});
        destroyCookie({}, "verification_code", {path: `/`});
        destroyCookie({}, "token", {path: '/'});
        destroyCookie({}, "username", {path: '/'});

        router.push(`/`);
    }

    return (
        <div className="grid absolute inset-0 h-screen w-screen items-center z-30">
            <div className="bg-white grid gap-4 justify-items-center text-center m-auto p-12">
                <p>Tem certeza que deseja sair da mesa virtual?</p>
                <div className="flex gap-4">
                    <button className='bg-indigo-500 h-10 w-20 rounded-lg' onClick={() => exit(token)}>Sim</button>
                    <button className='bg-indigo-500 h-10 w-20 rounded-lg' onClick={() => setModal(null)}>Não</button>
                </div>
            </div>
        </div>
    )
}