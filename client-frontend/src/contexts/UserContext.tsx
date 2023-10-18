"use client";

import IUserContext from "@/interfaces/IUserContext";
import { createContext, useContext, useState } from "react";
import { useLocalState, useCookieState } from "@/utils/persistence"

const initialData: IUserContext = {
    username: "",
    setUsername: () => {},
    token: "",
    setToken: () => {},
};

const UserContext = createContext<IUserContext>(initialData);

export function useUser() {
    return useContext(UserContext);
}

export default function UserProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    // const [username, setUsername] = useState<string>("");
    // const [token, setToken] = useState<string>("");
    const [username, setUsername] = useCookieState('username', '');
    const [token, setToken] = useCookieState('token', '');

    return (
        <UserContext.Provider
            value={{
                username,
                setUsername,
                token,
                setToken,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}