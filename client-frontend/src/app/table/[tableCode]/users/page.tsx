"use client"

import { useEffect, useState } from 'react'
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import { getAllUsers } from "@/app/actions";
import Users from "@/components/User/UserList";

// import EventSource from 'eventsource';
const EventSource = require('eventsource');

export default function UsersPage() {
  const verificationCode = Cookies.get("verification_code") || "";
  const token = Cookies.get("token") || "";
  const username = Cookies.get("username") || "";

  const [tableUsers, setTableUsers] = useState([]);

  const uri = 'http://localhost:8000/table/' + verificationCode + '/stream/';
  const ssEvents = new EventSource(
    uri, { withCredentials: false }
  );

  useEffect(() => {
    const getFetchUsers = async () => {
      const res = await getAllUsers(token);

      const { error } = res;
      if (error) {
        console.log(token);
        console.log(error);
        return null;
      }
      
      setTableUsers(res);
    };
    getFetchUsers();
  }, []);

  useEffect(() => {
    // listen to login event
    ssEvents.addEventListener("join-table", (e:any) => {
      const user = JSON.parse(e.data);
      const message =
        user.username === username
          ? "Welcome!"
          : "A new user joined the table!";
      toast(message, {
        position: "bottom-right",
        autoClose: 2000,
        draggable: true,
        pauseOnHover: true,
        progress: undefined,
        hideProgressBar: false,
        toastId: 'join',
      });
      setTableUsers((prevUsers) => [...prevUsers, user]);
    });

    ssEvents.addEventListener("leave-table", (e:any) => {
      const user = JSON.parse(e.data);
      const message =
        user.username === username
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
        <div className='overflow-y-auto pb-20 pt-10 self-start'>
          <Users users={tableUsers} />
        </div>
      </div>
  );
}