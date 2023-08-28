import { ModalProvider } from "../contexts/modal";
import { getAllOrders } from "../actions";
import { cookies } from "next/headers";
import Header from "../header";
import Orders from "./orders";
import Navigation from "../navigation";

export default async function Home() {
  const verificationCode = cookies().get("verification_code")?.value || ""
  const token = cookies().get("token")?.value || "";
  const res = await getAllOrders(token) || []

  const { error } = res;
  if (error) {
    console.log(token);
    console.log(error);
    return null;
  }

  console.log("RES: ");
  console.log(res);
  const orders = res.items;
  return (
    <ModalProvider>
      <Header code={verificationCode} token={token} />
      <div className='bg-gray-900 h-screen'>
        <div className='overflow-y-auto pb-20 pt-16 self-start'>
          <Orders orders={orders} />
        </div>
      </div>
      <Navigation />
    </ModalProvider>
  );
}
