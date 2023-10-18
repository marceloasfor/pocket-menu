"use client";

import { Dispatch, SetStateAction, createContext, useState } from 'react';


type ContextValueType = {
    username: string | null;
    setUsername: Dispatch<SetStateAction<string | null>>
    verificationCode: string | null;
    setVerificationCode: Dispatch<SetStateAction<string | null>>
}

export const SessionContext = createContext<ContextValueType>({
    username: null,
    setUsername: function (value: SetStateAction<string | null>): void {
        console.log('setUsername used before assigned.');
    },
    verificationCode: null,
    setVerificationCode: function (value: SetStateAction<string | null>): void {
        console.log('setVerificationCode used before assigned.');
    }
});

export const SessionProvider = ({ children }:{ children:React.ReactNode }) => {
    const [username, setUsername] = useState<string | null>(null);
    const [verificationCode, setVerificationCode] = useState<string | null>(null);

    return (
        <SessionContext.Provider value={{ username, setUsername, verificationCode, setVerificationCode }}>
            {children}
        </SessionContext.Provider>
    )
}