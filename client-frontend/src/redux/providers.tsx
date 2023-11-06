"use client"

import React from "react";
import { persistor, store } from '@/redux/store';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';

export default function Providers({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Provider store={store}>
            {/* <PersistGate persistor={persistor}> */}
                {children}
            {/* </PersistGate> */}
        </Provider>
    )
}