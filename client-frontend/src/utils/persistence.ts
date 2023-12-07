'use client'

import { useState, useEffect } from "react"
import { setCookie, parseCookies } from "nookies";
import { cookies } from "next/headers";
import Cookies from "js-cookie";

export function useLocalState(key:string, defaultValue:any) {
    // if (typeof window !== "undefined") {
    //     const [state, setState] = useState(
    //         () => JSON.parse(localStorage.getItem(key) || "") || defaultValue
    //     );

    //     useEffect(() => {
    //         localStorage.setItem(key, JSON.stringify(state));
    //     }, [key, state]);

    //     return [state, setState];
    // }
    return [null, null]
}

export function useCookieState(key:string, defaultValue:string) {
    // let value:any;
    // if (typeof Cookies.get(key)! == "undefined") {
    //     value = false
    // } else {
    //     value = Cookies.get(key)
    // }

    const [state, setState] = useState(
        () => Cookies.get(key) || defaultValue
    );

    useEffect(() => {
        Cookies.set(key, state, { expires: 1 });
    }, [key, state]);

    return [state, setState];
}