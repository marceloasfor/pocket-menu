"use client";

import { useUser } from "@/contexts/UserContext";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ClipLoader } from "react-spinners";

import { anonLogin } from "../../app/actions";
import { setCookie } from "nookies";
import { getSession, signIn } from "next-auth/react";
import { toast } from "react-toastify";

function LoginForm() {
    const [name, setName] = useState<string>("");
    const [table, setTable] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const { setUsername, setToken } = useUser();
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const res = await signIn("credentials", {
                redirect: false,
                username: name,
                password: table,
                callbackUrl,
            });
            // const { token, restaurant, table_number, error } = res;

            if (res?.error) {               
                throw new Error(error);
            } else if (res?.status === 200) {
                toast('Welcome back!', {
                    position: "bottom-right",
                    autoClose: 2000,
                    draggable: true,
                    pauseOnHover: true,
                    progress: undefined,
                    hideProgressBar: false,
                    toastId: 'join',
                });
            } else if (res?.status === 201) {
                toast('Welcome!', {
                    position: "bottom-right",
                    autoClose: 2000,
                    draggable: true,
                    pauseOnHover: true,
                    progress: undefined,
                    hideProgressBar: false,
                    toastId: 'join',
                });
            }

            const session = await getSession();
            const restaurant = session?.restaurant_id;
            const table_number = session?.table_number;
            const token = session?.user?.accessToken;

            setCookie(null, "restaurant", restaurant);
            setCookie(null, "verification_code", table_number);

            name && setUsername(name);
            token && setToken(token);
            
            router.push(`/table/${table_number}/users`);
        } catch (err: any) {
            console.error(err)
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            {error && <div className="text-md text-red-600">{error}</div>}
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-3">
                    <input
                        type="text"
                        className="px-4 py-2 w-80 h-10 bg-gray-50 rounded-full focus:outline-none focus:border focus:border-primary focus:bg-gray-50 focus:placeholder-gray-400/60 placeholder:text-sm"
                        placeholder="Verification Code"
                        onChange={(e) => setTable(e.target.value)}
                        required={true}
                    />
                    <input
                        type="text"
                        className="px-4 py-2 w-80 h-10 bg-gray-50 rounded-full focus:outline-none focus:border focus:border-primary focus:bg-gray-50 focus:placeholder-gray-400/60 placeholder:text-sm"
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
        </>
    );
}

export default LoginForm;