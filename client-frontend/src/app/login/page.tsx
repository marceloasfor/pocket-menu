"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react"
import { anonLogin } from "../actions";
import { setCookie } from "nookies";

export default function LoginForm() {
    const searchParams = useSearchParams()
    const router = useRouter();
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const res = await anonLogin(e.target.input.value, searchParams.get("c"));

        const { token } = res;
        const { error } = res;

        if (error) {
            console.log(error);
        }
        else {
            setCookie(null, "restaurant", searchParams.get("r") || "1");
            setCookie(null, "verification_code", searchParams.get("c") || "");
            setCookie(null, "token", token);
            router.push(`/users`);
        }
    }
    return (
        <div className="bg-gray-900 text-white flex h-screen">
            <form method="post" onSubmit={handleSubmit} className="grid text-center justify-center m-auto gap-4">
                <label>Name:</label>
                <input type="text" id="input" name="input" defaultValue="" className="shadow rounded-md text-center text-black" />
                <input type="submit" value="Enter"></input>
            </form>
        </div>
    )
}
