import { Dispatch, MouseEventHandler, SetStateAction, useContext, useState } from "react"
import AlertDialog from "./alert"

function AppPayment() {
    return (
        <div>
            <p>Para pagar pelo aplicativo, é necessário estar cadastrado em uma conta.</p>
        </div>
    )
}

function OutsidePayment({ setModal }:{ setModal:Dispatch<SetStateAction<JSX.Element | null>> }) {
    return (
        <div className="bg-white/30 grid grid-cols-2 gap-4">
            <button className="bg-indigo-300 h-10 w-40 rounded-lg" onClick={() => setModal(<AlertDialog message="Um atendente foi chamado para receber o pagamento." setModal={setModal} />)}>PIX</button>
            <button className="bg-indigo-300 h-10 w-40 rounded-lg" onClick={() => setModal(<AlertDialog message="Um atendente foi chamado para receber o pagamento." setModal={setModal} />)}>Crédito</button>
            <button className="bg-indigo-300 h-10 w-40 rounded-lg" onClick={() => setModal(<AlertDialog message="Um atendente foi chamado para receber o pagamento." setModal={setModal} />)}>Débito</button>
            <button className="bg-indigo-300 h-10 w-40 rounded-lg" onClick={() => setModal(<AlertDialog message="Um atendente foi chamado para receber o pagamento." setModal={setModal} />)}>Dinheiro</button>
        </div>
    )
}

function log(m:string) {
    console.log(m);
}

export default function Payment({ setModal }:{ setModal:Dispatch<SetStateAction<JSX.Element | null>> }) {
    const chooseOption = () => {
        setModal(<AlertDialog message="Um atendente foi chamado para receber o pagamento." setModal={setModal} />)
    }

    const [type, setType] = useState(<OutsidePayment setModal={setModal} />)

    return (
        <div className="backdrop-brightness-50 grid absolute inset-0 h-screen w-screen items-center z-50">
            <div className="bg-white grid gap-4 justify-items-center text-center m-auto p-12">
                <div className="flex gap-4">
                    <button className='bg-indigo-500 h-10 w-60 rounded-lg' onClick={() => setType(<OutsidePayment setModal={setModal} />)}>Presencial</button>
                    <button className='bg-indigo-500 h-10 w-60 rounded-lg' onClick={() => setType(<AppPayment />)}>Pelo aplicativo</button>
                </div>
                <div>{type}</div>
                <button className='bg-indigo-500 h-10 w-40 rounded-lg' onClick={() => setModal(null)}>Cancelar</button>
            </div>
        </div>
    )
}