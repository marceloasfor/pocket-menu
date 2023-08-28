"use client";

import { Dispatch, SetStateAction, createContext, useState } from 'react';


type ContextValueType = {
    modal: React.JSX.Element | null;
    setModal: Dispatch<SetStateAction<JSX.Element | null>>
}

export const ModalContext = createContext<ContextValueType>({
    modal: null,
    setModal: function (value: SetStateAction<JSX.Element | null>): void {
        console.log('setModal used before assigned.');
    }
});

export const ModalProvider = ({ children }:{ children:React.ReactNode }) => {
    const [modal, setModal] = useState<React.JSX.Element | null>(null);
    const changeModal = (newModal:React.JSX.Element | null) => {
        setModal(newModal);
    }

    return (
        <ModalContext.Provider value={{ modal, setModal }}>
            {children}
        </ModalContext.Provider>
    )
}