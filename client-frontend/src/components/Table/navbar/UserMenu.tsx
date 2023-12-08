'use client';

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { toast } from 'react-toastify';

import useLoginModal from "@/hooks/useLoginModal";
import { SafeUser } from "@/types/user";

import MenuItem from "./MenuItem";
import Avatar from "@/components/Avatar";

import { backendURL } from "@/app/api/auth/[...nextauth]/route"

interface UserMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser
}) => {
  const router = useRouter();
  const { tableCode } = useParams();

  const loginModal = useLoginModal();

  const [isOpen, setIsOpen] = useState(false);

  const verificationCode = fetch(`${backendURL}/table/${tableCode}/`,
  {
      method: 'GET',
      headers: { "Content-Type" : "application/json" },
  })
    .then((response) => response.json())
    .then((table) => {
      return table[0]?.verification_code
    })

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <span>Código da Mesa: {verificationCode}</span>
        <div
          onClick={()=>''}
          className="
            hidden
            md:block
            text-md
            font-semibold
            py-3
            px-4
            rounded-full
            hover:bg-neutral-100
            transition
            cursor-pointer
          "
        >
          Bem-vindo {currentUser?.name}
        </div>
        <div
        onClick={toggleOpen}
        className="
          p-4
          md:py-1
          md:px-2
          border-[1px]
          border-neutral-200
          flex
          flex-row
          items-center
          gap-3
          rounded-full
          cursor-pointer
          hover:shadow-md
          transition
          "
        >
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
          <AiOutlineMenu />
        </div>
      </div>
      {isOpen && (
        <div
          className="
            absolute
            rounded-xl
            shadow-md
            w-[40vw]
            md:w-3/4
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  label="Meus Pedidos"
                  onClick={() => router.push(`/table/${tableCode}/orders`)}
                />
                <MenuItem
                  label="Cardápio"
                  onClick={() => router.push(`/table/${tableCode}/menu`)}
                />
                <MenuItem
                  label="Chamar Atendente"
                  onClick={() => toast('O atendente estará com você em breve!', {
                    position: "bottom-right",
                    autoClose: 2000,
                    draggable: true,
                    pauseOnHover: true,
                    progress: undefined,
                    hideProgressBar: false,
                    toastId: 'join',
                })}
                />
                <hr />
                <MenuItem
                  label="Sair"
                  // onClick={() => signOut()}
                  onClick={loginModal.onOpen}
                />
              </>
            ) : (
              <>
                <MenuItem
                  label="Login"
                  onClick={()=>''}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
   );
}

export default UserMenu;