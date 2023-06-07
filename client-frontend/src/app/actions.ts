'use server';

import { cookies } from 'next/headers';
 
export async function getAllUsers(verification_code:string|null) {
    const res = await fetch(`http://localhost:3000/api/tables/member?verification_code=${verification_code}`, {
        method: 'GET'
    });
    const result = await res.json();
    return result.res;
}

export async function anonLogin(username:string, code:string|null) {
    const res = await fetch('http://localhost:3000/api/tables/member', {
        method: 'POST',
        body: JSON.stringify({ username: username, verification_code: code }),
    });
    const result = await res.json();
    return result.res;
}

export async function exitTable(username:string|null) {
    const res = await fetch('http://localhost:3000/api/tables/member', {
        method: 'DELETE',
        body: JSON.stringify({ username: username }),
    });
    const result = await res.json();
    return result.res;
}

export async function getAllOrders(verification_code:string|null) {
    const res = await fetch(`http://localhost:3000/api/order?verification_code=${verification_code}`, {
        method: 'GET'
    });
    const result = await res.json();
    return result.res;
}

export async function addOrder(verification_code:string|null, id:number) {
    const res = await fetch('http://localhost:3000/api/order', {
        method: 'POST',
        body: JSON.stringify({ verification_code: verification_code, id: id }),
    });
    const result = await res.json();
    return result.res;
}

export async function getAllMenuItems(restaurant:string|null) {
    const res = await fetch(`http://localhost:3000/api/item?restaurant=${restaurant}`, {
        method: 'GET'
    });
    const result = await res.json();
    return result.res;
}

export async function setCookie(key:string, value:string) {
    cookies().set(key, value);
}