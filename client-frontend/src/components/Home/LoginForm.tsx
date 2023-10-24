"use client";

import { useUser } from "@/contexts/UserContext";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";

import { anonLogin } from "../../app/actions";
import { setCookie } from "nookies";

function LoginForm() {
    const [name, setName] = useState<string>("");
    const [table, setTable] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { setUsername, setToken } = useUser();
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);

        const res = await anonLogin(name, table);
        const { token, restaurant, error } = res;

        if (error) {
            console.log(error);
        } else {
            setCookie(null, "restaurant", restaurant);
            setCookie(null, "verification_code", table);

            name && setUsername(name);
            token && setToken(token);
            
            router.push(`/table/${table}/users`);
        }
    }

    return (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
                <input
                    type="text"
                    className="px-4 py-2 w-80 h-10 bg-gray-100 rounded-full focus:outline-none focus:border focus:border-primary focus:bg-gray-50 focus:placeholder-gray-400/60 placeholder:text-sm"
                    placeholder="Table Number"
                    onChange={(e) => setTable(e.target.value)}
                    required={true}
                />
                <input
                    type="text"
                    className="px-4 py-2 w-80 h-10 bg-gray-100 rounded-full focus:outline-none focus:border focus:border-primary focus:bg-gray-50 focus:placeholder-gray-400/60 placeholder:text-sm"
                    placeholder="Username"
                    onChange={(e) => setName(e.target.value)}
                    minLength={3}
                    maxLength={20}
                    required={true}
                />
            </div>
            <div className="flex gap-5 items-center">
                <button
                    type="submit"
                    className="flex justify-center items-center w-40 btn"
                    disabled={isLoading}
                >
                {isLoading ? (
                    <ClipLoader color="white" size={20} />
                ) : (
                    "Join Table"
                )}
                </button>
            </div>
        </form>
    );
}

export default LoginForm;