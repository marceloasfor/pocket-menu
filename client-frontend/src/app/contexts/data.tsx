"use client";

import { Dispatch, SetStateAction, createContext, useState } from 'react';
import { Data } from '../table/interfaces/data';


type ContextValueType = {
    data: Data;
    setData: Dispatch<SetStateAction<Data>>
}

export const DataContext = createContext<ContextValueType>({
    data: {
        users: [],
        orders: [],
        menu: [],
        verificationCode: "",
        username: null
    },
    setData: function (value: SetStateAction<Data>): void {
        console.log('setUsername used before assigned.');
    }
});

export const DataProvider = ({ children }:{ children:React.ReactNode }) => {
    const [data, setData] = useState<Data>({ users: [], orders: [], menu: [], verificationCode: "", username: null });

    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    )
}