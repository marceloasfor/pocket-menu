"use client";

import { useContext, useState } from "react"
import { ModalContext } from "./contexts/modal";
import AlertDialog from "./dialogs/alert";
import Payment from "./dialogs/payment";
import ExitDialog from "./dialogs/exit";

export default function Header({ code="", username }:{ code:string, username:string }) {
    const [modal, setModal] = useState<React.JSX.Element|null>(null);
    const [showOptions, setShowOptions] = useState(false);
    const toggleOptions = () => {
        setShowOptions(!showOptions);
    }

    console.log(username)

    const showAlert = () => {
        setModal(<AlertDialog message="Um atendente foi chamado." setModal={setModal} />)
    }
    const showPayment = () => {
        setModal(<Payment setModal={setModal} />)
    }
    const showExit = () => {
        setModal(<ExitDialog setModal={setModal} username={username} />)
    }

    return (
        <div>
            {modal}
            <div className='bg-white fixed flex flex-row gap-4 p-4 inset-x-0 top-0 z-10 justify-between'>
                <button className='bg-indigo-500 h-10 w-10 rounded-full' onClick={toggleOptions}>...</button>
                <div className='self-center justify-end'>
                    <p>{code}</p>
                </div>
            </div>
            <div className={showOptions ? "visible" : "invisible"} >
                <div className='grid grid-cols-1 gap-4 p-4 absolute left-0 top-16 z-10 content-end'>
                    <button className='bg-indigo-500 h-10 w-10 rounded-full' onClick={showAlert}>1</button>
                    <button className='bg-indigo-500 h-10 w-10 rounded-full' onClick={showPayment}>2</button>
                    <button className='bg-indigo-500 h-10 w-10 rounded-full' onClick={showExit}>3</button>
                </div>
            </div>
        </div>
    )
}