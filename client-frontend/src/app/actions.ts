'use server';

import { cookies } from 'next/headers';

// funcionando
export async function getAllUsers(verification_code:string|null) {
    const res = await fetch(`http://localhost:8000/table/member/?verification_code=${verification_code}`, {
        method: 'GET'
    });
    const result = await res.json();
    return result;
}

// funcionando
export async function anonLogin(username:string, verification_code:string|null) {
    console.log("login: " + username + " " + verification_code)
    const res = await fetch('http://localhost:8000/table/member/', {
        method: 'POST',
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({ username: username, verification_code: verification_code }),
    });
    console.log(res)
    const result = await res.json();
    return result;
}

// não testado
export async function exitTable(username:string) {
    console.log(username)
    const res = await fetch('http://localhost:3000/table/member/', {
        method: 'DELETE',
        body: JSON.stringify({ username: username }),
    });
    console.log(res)
    const result = await res.json();
    return result;
}

// não testado
export async function getAllOrders(verification_code:string|null) {
    // /?verification_code=${verification_code}
    const res = await fetch(`http://localhost:8000/order/`, {
        method: 'GET'
    });
    const result = await res.json();

    return result;
}

// não testado
export async function addOrder(verification_code:string|null, id:number) {
    const res = await fetch('http://localhost:8000/order/', {
        method: 'POST',
        body: JSON.stringify({ verification_code: verification_code, id: id }),
    });
    const result = await res.json();
    return result;
}

// funcionando
export async function getAllMenuItems(restaurant:string) {
    const res = await fetch(`http://localhost:8000/item/?restaurant=${restaurant}`, {
        method: 'GET',
        headers: { "Content-Type" : "application/json" }
    });
    const result = await res.json();
    return result;
}

// não é pra chamada de API
export async function setCookie(key:string, value:string) {
    cookies().set(key, value);
}