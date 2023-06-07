import { Dispatch, SetStateAction, useContext } from "react";
import { useRouter } from "next/navigation";
import { exitTable } from "../actions";

export default function ExitDialog({ setModal, username }:{ setModal:Dispatch<SetStateAction<JSX.Element | null>>, username:string }) {
    const router = useRouter();
    
    const exit = async (username:string) => {
        // router.push(`/verification`);
        console.log("username: " + username)
        await exitTable(username);
    }

    return (
        <div className="grid absolute inset-0 h-screen w-screen items-center z-30">
            <div className="bg-white grid gap-4 justify-items-center text-center m-auto p-12">
                <p>Tem certeza que deseja sair da mesa virtual?</p>
                <div className="flex gap-4">
                    <button className='bg-indigo-500 h-10 w-20 rounded-lg' onClick={() => exit(username)}>Sim</button>
                    <button className='bg-indigo-500 h-10 w-20 rounded-lg' onClick={() => setModal(null)}>Não</button>
                </div>
            </div>
        </div>
    )
}