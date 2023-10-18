import { Dispatch, SetStateAction, useContext } from "react";

export default function AlertDialog({ message="", setModal }:{ message:string, setModal:Dispatch<SetStateAction<JSX.Element | null>> }) {
    return (
        <div className="grid absolute inset-0 h-screen w-screen items-center z-30">
            <div className="bg-white grid gap-4 justify-items-center text-center m-auto p-12">
                <p>{message}</p>
                <button className='bg-indigo-500 h-10 w-20 rounded-lg' onClick={() => setModal(null)}>Ok</button>
            </div>
        </div>
    )
}