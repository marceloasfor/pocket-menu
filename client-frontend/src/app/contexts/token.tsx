"use client";

import { Dispatch, SetStateAction, createContext, useState } from 'react';


type ContextValueType = {
    token: string | null;
    setToken: Dispatch<SetStateAction<string | null>>
}

export const TokenContext = createContext<ContextValueType>({
    token: null,
    setToken: function (value: SetStateAction<string | null>): void {
        console.log('setToken used before assigned.');
    }
});

export const TokenProvider = ({ children }:{ children:React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const changetoken = (newtoken:string | null) => {
        setToken(newtoken);
    }

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            {children}
        </TokenContext.Provider>
    )
}