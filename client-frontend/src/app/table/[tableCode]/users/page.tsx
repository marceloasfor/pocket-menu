"use client"

import { useEffect, useState } from 'react'
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import { getAllUsers } from "@/app/actions";
import Users from "@/components/User/UserList";
import { getSession, useSession } from 'next-auth/react';

// import {SERVER_URL} from '@/config'
import { backendURL } from "@/app/api/auth/[...nextauth]/route"

// import EventSource from 'eventsource';
const EventSource = require('eventsource');

export default function UsersPage() {
  // const verificationCode = Cookies.get("verification_code") || "";
  // const token = Cookies.get("token") || "";
  // const username = Cookies.get("username") || "";
  const {data: session} = useSession();
  const [, setError] = useState();

  const [tableUsers, setTableUsers] = useState([]);

  const uri = backendURL + '/table/' + session?.table_number + '/stream/';
  const ssEvents = new EventSource(
    uri, { withCredentials: false }
  );

  useEffect(() => {
    const getFetchUsers = async () => {
      const user_session = await getSession();
      try {
        const res = await getAllUsers(user_session?.user?.accessToken);
        const { error } = res;

        if (error) {
          throw new Error(error)
        }

        setTableUsers(res);
      } catch (err) {
        console.error(err)
        setError(() => {
          throw err;
        });
      }
    };
    getFetchUsers();
  }, []);

  useEffect(() => {
    // listen to login event
    ssEvents.addEventListener("join-table", (e:any) => {
      const user = JSON.parse(e.data);

      if(!(user.username === session?.user?.name)) {
        toast("A new user joined the table!", {
          position: "bottom-right",
          autoClose: 2000,
          draggable: true,
          pauseOnHover: true,
          progress: undefined,
          hideProgressBar: false,
          toastId: 'join',
        });
        setTableUsers((prevUsers) => [...prevUsers, user]);
      }
    });

    ssEvents.addEventListener("leave-table", (e:any) => {
      const user = JSON.parse(e.data);
      const message =
        user.username === session?.user?.name
          ? "Bye!"
          : "A user left the table!";
      toast(message, {
        position: "bottom-right",
        autoClose: 2000,
        draggable: true,
        pauseOnHover: true,
        progress: undefined,
        hideProgressBar: false,
        toastId: 'leave',
      });
      setTableUsers(prevUsers => prevUsers.filter(item => item.id !== user.id));
    });

    // listen to open event
    ssEvents.onopen = (e:any) => {
      console.log(e);
    };
    // listen to error event
    ssEvents.onerror = (e:any) => {
      console.log(e);
    };

    return () => {
      ssEvents.close();
    };
  }, []);

  return (
      <div className='h-screen text-white'>
        <div className='overflow-y-auto pb-20 self-start'>
          <Users users={tableUsers} />
        </div>
      </div>
  );
}