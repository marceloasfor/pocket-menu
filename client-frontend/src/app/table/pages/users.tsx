import { User } from "../interfaces/user";

function UserCard({ user=null }:{ user:User|null }) {
    if (user === null) return null
    return (
        <div className='bg-indigo-500 rounded-lg m-4 grid justify-center text-center md:flex md:justify-start p-4'>
            <div className="bg-black m-8 rounded-full h-32 w-32"></div>
            <h1 className="self-center">{user.name}</h1>
        </div>
    )
}

export default function Users({ users=[] }:{ users:User[] }) {
    if (users.length === 0) return null;
    
    const userCards: React.JSX.Element[] = [];
    users.forEach((u, i) => userCards.push(<UserCard key={i} user={u} />));

    return (
        <div className="grid grid-cols-2">
            {userCards}
        </div>
    );
}
