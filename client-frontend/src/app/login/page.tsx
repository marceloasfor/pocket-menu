"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react"
import { getAllUsers, anonLogin, addOrder, exitTable, getAllMenuItems, getAllOrders, setCookie } from "../actions";

export default function LoginForm() {
    const searchParams = useSearchParams()
    const router = useRouter();
    const [name, setName] = useState("");
    const handleChange = (e: any) => setName(e.target.value);
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await anonLogin(name, searchParams.get("c"));
        setCookie("restaurant", searchParams.get("r") || "1");
        setCookie("verification_code", searchParams.get("c") || "");
        setCookie("username", name || "");
        router.push(`/users`);
    }
    return (
        <div className="flex h-screen">
            <form method="post" onSubmit={handleSubmit} className="grid text-center justify-center m-auto gap-4">
                <label>Name:</label>
                <input type="text" name="name-input" defaultValue="" onChange={handleChange} className="shadow rounded-md text-center" />
                <input type="submit" value="Enter"></input>
            </form>
        </div>
    )
}
