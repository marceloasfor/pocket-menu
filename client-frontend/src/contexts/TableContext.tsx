"use client"

import React, { createContext, useReducer, useEffect, useContext, useState } from "react";
import { ssEvents } from "@/config";
// import { getAllUsers } from "../lib";
// import { appReducer } from "@/reducer";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useLocalState, useCookieState } from "@/utils/persistence"
import { getAllUsers } from "@/app/actions";
import { useUser } from "./UserContext";

const initialState = {
  users: [],
  newUser: {},
  isLoading: true,
  isError: false,
};

export const TableContext = createContext(initialState);

export default function TableProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [appState, appDispatch] = useReducer(appReducer, initialState);

  const token = Cookies.get("token") || "";
  

  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({});

  const { username } = useUser();

  

  useEffect(() => {
    const getFetchUsers = async () => {
      const res = await getAllUsers(token);

      const { error } = res;
      if (error) {
        console.log(token);
        console.log(error);
        return null;
      }
      
      // appDispatch({ type: GET_USERS, payload: res });
      setUsers(res);
    };
    getFetchUsers();
  }, []);

  return (
    <TableContext.Provider value={{ users, newUser }}>
      {children}
    </TableContext.Provider>
  );
};

export const useTableContext = () => useContext(TableContext);