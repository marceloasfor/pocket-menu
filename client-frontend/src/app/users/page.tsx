import Table from "./table";

import { ModalProvider } from "../contexts/modal";
import { cookies } from "next/headers";
import { getAllMenuItems, getAllOrders, getAllUsers } from "../actions";


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
  const restaurant = cookies().get("restaurant")
  const verificationCode = cookies().get("verification_code")
  const username = cookies().get("username")
  const users = await getAllUsers(verificationCode?.value || "") || []
  return (
    <ModalProvider>
      <Table users={users} verificationCode={verificationCode?.value || ""} />
    </ModalProvider>
  );
}
