'use server';

// import { SERVER_URL } from "@/config";
import { backendURL } from "@/app/api/auth/[...nextauth]/route"

export async function getAllUsers(token:string) {
    const res = await fetch(`${backendURL}/table/member/`,
    {
        method: 'GET',
        headers: { "Authorization" : `Bearer ${token}` }
    });
    const result = await res.json();

    return result;
}

export async function anonLogin(username:string, verification_code:string|null) {
    console.log("login: " + username + "\tCode:" + verification_code);
    const res = await fetch(`${backendURL}/table/member/`, {
        method: 'POST',
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({ username: username, verification_code: verification_code }),
    });
    const result = await res.json();
    return result;
}

export async function exitTable(token:string) {
    const res = await fetch(`${backendURL}/table/member/`, {
        method: 'DELETE',
        headers: { "Authorization" : `Bearer ${token}` }
    });
    const result = await res.json();
    return result;
}

export async function getAllOrders(token:string) {
    const res = await fetch(`${backendURL}/order/active/`, {
        method: 'GET',
        headers: { "Authorization" : `Bearer ${token}` }
    });
    const result = await res.json();
    return result;
}

export async function addOrder(token:string, id:number) {
    const res = await fetch(`${backendURL}/order/`, {
        method: 'POST',
        headers: { "Authorization" : `Bearer ${token}` },
        body: JSON.stringify({ id: id }),
    });
    const result = await res.json();
    return result;
}

export async function getAllMenuItems(restaurant:string) {
    const res = await fetch(`${backendURL}/item/?restaurant=${restaurant}`, {
        method: 'GET',
        headers: { "Content-Type" : "application/json" }
    });
    const result = await res.json();
    return result;
}

export async function sendOrder(token:string, items:any) {
    const res = await fetch(`${backendURL}/order/`, {
        method: 'POST',
        headers: { "Authorization" : `Bearer ${token}` },
        body: JSON.stringify({ items: items }),
    });
    const result = await res.json();
    return result;
}