import { ModalProvider } from "../contexts/modal";
import { cookies } from "next/headers";
import { getAllUsers } from "../actions";
import Header from "../header";
import Navigation from "../navigation";
import Users from "./users";


export default async function Home() {
  const verificationCode = cookies().get("verification_code")?.value || "";
  const token = cookies().get("token")?.value || "";
  const res = await getAllUsers(token) || [];

  const { error } = res;
  if (error) {
    console.log(token);
    console.log(error);
    return null;
  }

  const users = res;

  return (
    <ModalProvider>
      <Header code={verificationCode} token={token} />
      <div className='bg-gray-900 h-screen text-white'>
        <div className='overflow-y-auto pb-20 pt-16 self-start'>
          <Users users={users} />
        </div>
      </div>
      <Navigation />
    </ModalProvider>
  );
}
