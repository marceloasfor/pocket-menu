'use client';

import { useCallback, useState } from "react";
import { signIn, signOut, useSession } from 'next-auth/react';
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useRouter } from "next/navigation";

import useLoginModal from "@/hooks/useLoginModal";

import Modal from "./Modal";
import Heading from "../Heading";
import Button from "../Button";
import { toast } from "react-toastify";
import { SafeUser } from "@/types/user";

interface LogoutProps {
  currentUser?: SafeUser | null;
}

const LogoutModal: React.FC<LogoutProps> = ({
  currentUser,
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    loginModal.onClose();
  }, [loginModal])

  const onExit = () => {
    setIsLoading(true);

    fetch('http://127.0.0.1:8000/table/member/', {
        method: 'DELETE',
        headers: { "Authorization" : `Bearer ${currentUser?.accessToken}` }
    })
    .then(() => {
      signOut();
      toast.success('Bye!');
      loginModal.onClose();
    })
    .catch((error) => {
      toast.error(error);
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="See you later"
        subtitle="Are you sure you want to logout?"
      />
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Logout"
      actionLabel="Yes"
      onClose={loginModal.onClose}
      secondaryActionLabel="No"
      secondaryAction={loginModal.onClose}
      body={bodyContent}
      onSubmit={onExit}
    />
  );
}

export default LogoutModal;
