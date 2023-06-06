"use client";

import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useContext, useState } from "react";

import { verifyCode } from "../utils/call";


export default function VerificationForm() {
    const router = useRouter();
    const [code, setCode] = useState("");
    
    const handleChange = (e: any) => setCode(e.target.value);
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        router.push(`/login?c=${code}`);
    }
    return (
        <div className="flex h-screen">
            <form method="post" onSubmit={handleSubmit} className="grid text-center justify-center m-auto gap-4">
                <label>Verfication code:</label>
                <input type="text" name="verification-code" defaultValue="" onChange={handleChange} className="shadow rounded-md text-center" />
                <input type="submit" value="Verify"></input>
            </form>
        </div>
    )
}
