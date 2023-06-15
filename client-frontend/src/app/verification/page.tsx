"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";


export default function VerificationForm() {
    const router = useRouter();
    const [code, setCode] = useState("");

    const handleChange = (e: any) => setCode(e.target.value);
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        router.push(`/login?r=1&c=${code}`);
    }
    return (
        <div className="bg-gray-900 text-white flex h-screen">
            <form method="post" onSubmit={handleSubmit} className="grid text-center justify-center m-auto gap-4">
                <label>Insira o código de mesa:</label>
                <input type="text" name="verification-code" defaultValue="" onChange={handleChange} className="shadow rounded-md text-center text-black" />
                <input type="submit" value="Entrar"></input>
            </form>
        </div>
    )
}
