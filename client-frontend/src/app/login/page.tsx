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
        // await getAllUsers(searchParams.get("c"));
        // console.log("get user ok")
        await anonLogin(name, searchParams.get("c"));
        // console.log("post user ok")
        // await exitTable(name);
        // console.log("delete user ok")
        // await getAllOrders(searchParams.get("c"));
        // console.log("get order ok")
        // await addOrder(searchParams.get("c"));
        // console.log("post order ok")
        // await getAllMenuItems(searchParams.get("r"));
        // console.log("get menu ok")
        setCookie("restaurant", searchParams.get("r") || "");
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
