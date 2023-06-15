import { User } from "../interfaces/user";
import Image from 'next/image'
import userImage from "../../../public/user.png"

function UserCard({ user=null }:{ user:User|null }) {
    if (user === null) return null
    return (
        <div className='bg-gray-900 rounded-lg m-4 grid justify-center text-center md:flex md:justify-start p-4'>
            {/* <div className="bg-black m-8 rounded-full h-32 w-32"></div> */}
            <Image src={userImage} width={250} height={250} alt="User picture placeholder" />
            <h1 className="self-center">{user.username}</h1>
        </div>
    )
}

export default function Users({ users }:{ users:User[] }) {
    if (users.length === 0) return null;
    
    const userCards: React.JSX.Element[] = [];
    users.forEach((u, i) => userCards.push(<UserCard key={i} user={u} />));

    return (
        <div className="grid grid-cols-2">
            {userCards}
        </div>
    );
}
