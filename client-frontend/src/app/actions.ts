'use server';

import { SERVER_URL } from "@/config";

export async function getAllUsers(token:string) {
    const res = await fetch(`${SERVER_URL}/table/member/`, 
    {
        method: 'GET',
        headers: { "Authorization" : `Bearer ${token}` }
    });
    const result = await res.json();

    return result;
}

export async function anonLogin(username:string, verification_code:string|null) {
    console.log("login: " + username + "\tCode:" + verification_code);
    const res = await fetch(`${SERVER_URL}/table/member/`, {
        method: 'POST',
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({ username: username, verification_code: verification_code }),
    });
    const result = await res.json();
    return result;
}

export async function exitTable(token:string) {
    const res = await fetch(`${SERVER_URL}/table/member/`, {
        method: 'DELETE',
        headers: { "Authorization" : `Bearer ${token}` }
    });
    const result = await res.json();
    return result;
}

export async function getAllOrders(token:string) {
    const res = await fetch(`${SERVER_URL}/order/active/`, {
        method: 'GET',
        headers: { "Authorization" : `Bearer ${token}` }
    });
    const result = await res.json();
    return result;
}

export async function addOrder(token:string, id:number) {
    const res = await fetch(`${SERVER_URL}/order/`, {
        method: 'POST',
        headers: { "Authorization" : `Bearer ${token}` },
        body: JSON.stringify({ id: id }),
    });
    const result = await res.json();
    return result;
}

export async function getAllMenuItems(restaurant:string) {
    const res = await fetch(`${SERVER_URL}/item/?restaurant=${restaurant}`, {
        method: 'GET',
        headers: { "Content-Type" : "application/json" }
    });
    const result = await res.json();
    return result;
}

export async function sendOrder(token:string, items:any) {
    const res = await fetch(`${SERVER_URL}/order/`, {
        method: 'POST',
        headers: { "Authorization" : `Bearer ${token}` },
        body: JSON.stringify({ items: items }),
    });
    const result = await res.json();
    return result;
}