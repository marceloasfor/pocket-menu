import { useContext } from "react";
import { ModalContext } from "../../contexts/modal";
import { useRouter } from "next/router";

export default function ExitDialog() {
    const router = useRouter();
    const {modal, setModal} = useContext(ModalContext);
    
    const exitTable = () => {
        router.push(`/verification`);
    }

    return (
        <div className="grid absolute inset-0 h-screen w-screen items-center z-30">
            <div className="bg-white grid gap-4 justify-items-center text-center m-auto p-12">
                <p>Tem certeza que deseja sair da mesa virtual?</p>
                <div className="flex gap-4">
                    <button className='bg-indigo-500 h-10 w-20 rounded-lg' onClick={exitTable}>Sim</button>
                    <button className='bg-indigo-500 h-10 w-20 rounded-lg' onClick={() => setModal(null)}>Não</button>
                </div>
            </div>
        </div>
    )
}