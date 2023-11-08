
import { User } from "@/interfaces/user";
import Image from 'next/image'
import userImage from "../../../public/user.png"
import { useEffect, useState } from "react";
import { SkeletonCard } from "./SkeletonCard";

function UserCard({ user=null }:{ user:User|null }) {
    if (user === null) return null
    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg">
            <div className='flex flex-col items-center py-5'>
                <Image className='w-24 h-24 mb-3 rounded-full shadow-lg' src={userImage} alt="User picture placeholder" />
                <h4 className="mb-1 text-xl font-medium text-gray-900">{user.username}</h4>
            </div>
        </div>
    )
}

export default function Users({ users }:{ users:User[] }) {
    if (users.length === 0) return null;

    return (
        <>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 px-10">
                {users.map((user: User) => (
                    <UserCard key={user.username} user={user} />
                ))}
            </div>
        </>
    );
}
