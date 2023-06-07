import Table from "./table";

import { ModalProvider } from "../contexts/modal";
import { cookies } from "next/headers";
import { getAllMenuItems, getAllOrders, getAllUsers } from "../actions";
import Header from "../header";


async function getData(restaurant:string, verCode:string, username:string) {
  return {
    users: await getAllUsers(verCode) || [],
    orders: await getAllOrders(verCode) || [],
    menu: await getAllMenuItems(restaurant) || [],
    restaurant: restaurant,
    verificationCode: verCode,
    username: username
  };
}

export default async function Home() {
  const restaurant = cookies().get("restaurant")?.value || ""
  const verificationCode = cookies().get("verification_code")?.value || ""
  const username = cookies().get("username")?.value || ""
  const users = await getAllUsers(verificationCode) || []
  return (
    <ModalProvider>
      <Header code={verificationCode} username={username} />
      <Table users={users} verificationCode={verificationCode} />
    </ModalProvider>
  );
}
