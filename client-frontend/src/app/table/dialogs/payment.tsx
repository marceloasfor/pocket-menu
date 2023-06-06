import { useContext, useState } from "react"
import { ModalContext } from "../../contexts/modal";

function AppPayment() {
    return (
        <div>
            <p>Para pagar pelo aplicativo, é necessário estar cadastrado em uma conta.</p>
        </div>
    )
}

function OutsidePayment() {
    return (
        <div className="grid grid-cols-2 gap-4">
            <button className="bg-indigo-300 h-10 w-40 rounded-lg">PIX</button>
            <button className="bg-indigo-300 h-10 w-40 rounded-lg">Crédito</button>
            <button className="bg-indigo-300 h-10 w-40 rounded-lg">Débito</button>
            <button className="bg-indigo-300 h-10 w-40 rounded-lg">Dinheiro</button>
        </div>
    )
}

export default function Payment() {
    const {setModal} = useContext(ModalContext);
    const [type, setType] = useState(<OutsidePayment />)

    return (
        <div className="grid absolute inset-0 h-screen w-screen items-center z-30">
            <div className="bg-white grid gap-4 justify-items-center text-center m-auto p-12">
                <div className="flex gap-4">
                    <button className='bg-indigo-500 h-10 w-60 rounded-lg' onClick={() => setType(<OutsidePayment />)}>Presencial</button>
                    <button className='bg-indigo-500 h-10 w-60 rounded-lg' onClick={() => setType(<AppPayment />)}>Pelo aplicativo</button>
                </div>
                <div>{type}</div>
                <button className='bg-indigo-500 h-10 w-40 rounded-lg' onClick={() => setModal(null)}>Cancelar</button>
            </div>
        </div>
    )
}