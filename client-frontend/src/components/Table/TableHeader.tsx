"use client";

import React, { useEffect, useState } from "react";
import AlertDialog from "../dialogs/alert";
import Payment from "../dialogs/payment";
import ExitDialog from "../dialogs/exit";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";

function TableHeader() {
    const { tableCode } = useParams();
    const [modal, setModal] = useState<React.JSX.Element|null>(null);
    const [showOptions, setShowOptions] = useState(false);
    const token = Cookies.get("token") || "";
    const [username, setUsername] = useState("");

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    }

    const showAlert = () => {
        setModal(<AlertDialog message="Um atendente foi chamado." setModal={setModal} />)
    }
    const showPayment = () => {
        setModal(<Payment setModal={setModal} />)
    }
    const showExit = () => {
        setModal(<ExitDialog setModal={setModal} token={token} />)
    }

    useEffect(() => {
      setUsername(Cookies.get("username")!)
    }, [])
    

    return (
        <div className="sticky top-0 left-0 right-0 z-10 w-full h-15 border-b border-gray-200 items-center p-2 content-center bg-white">
            <div className='flex justify-between h-full w-full font-medium'>
                {modal}
                <button className="btn" onClick={toggleOptions}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1.7em" viewBox="0 0 448 512">{/* Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                        <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                    </svg>
                </button>
                <div className= {showOptions ? "visible" : "invisible"} >
                    <div className='grid grid-cols-1 gap-4 p-4 absolute left-0 top-16 z-10 content-end'>
                        <button className='bg-indigo-500 h-10 w-10 rounded-full flex justify-center items-center' onClick={showAlert}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1.7em" viewBox="0 0 512 512">{/* Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}<path d="M216 64c-13.3 0-24 10.7-24 24s10.7 24 24 24h16v33.3C119.6 157.2 32 252.4 32 368H480c0-115.6-87.6-210.8-200-222.7V112h16c13.3 0 24-10.7 24-24s-10.7-24-24-24H256 216zM24 400c-13.3 0-24 10.7-24 24s10.7 24 24 24H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H24z"/></svg>
                        </button>
                        <button className='bg-indigo-500 h-10 w-10 rounded-full flex justify-center items-center' onClick={showPayment}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1.7em" viewBox="0 0 576 512">{/*Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}<path d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zm64 320H64V320c35.3 0 64 28.7 64 64zM64 192V128h64c0 35.3-28.7 64-64 64zM448 384c0-35.3 28.7-64 64-64v64H448zm64-192c-35.3 0-64-28.7-64-64h64v64zM288 160a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/></svg>
                        </button>
                        <button className='bg-indigo-500 h-10 w-10 rounded-full flex justify-center items-center' onClick={showExit}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1.7em" viewBox="0 0 576 512">{/*Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}<path d="M320 32c0-9.9-4.5-19.2-12.3-25.2S289.8-1.4 280.2 1l-179.9 45C79 51.3 64 70.5 64 92.5V448H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H96 288h32V480 32zM256 256c0 17.7-10.7 32-24 32s-24-14.3-24-32s10.7-32 24-32s24 14.3 24 32zm96-128h96V480c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H512V128c0-35.3-28.7-64-64-64H352v64z"/></svg>
                        </button>
                    </div>
                </div>

                <p className="m-0 text-xl">Welcome {username}</p>
            </div>
        </div>
    );
}

export default TableHeader;