"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useState } from "react"

export default function LoginForm() {
    const searchParams = useSearchParams()
    const router = useRouter();
    const [name, setName] = useState("");
    const handleChange = (e: any) => setName(e.target.value);
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        router.push(`/table?r=${searchParams.get("r")}&c=${searchParams.get("c")}&n=${name}`);
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
