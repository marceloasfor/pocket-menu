import Table from "./table";

import { fetchMenu, fetchOrders, fetchUsers } from "../utils/fetch";
import { ModalProvider } from "../contexts/modal";
import { DataProvider } from "../contexts/data";
import { TokenProvider } from "../contexts/token";
import { getAllMenuItems } from "../actions";
import { cookies } from "next/headers";
import Header from "../header";


async function getData(verCode:string) {
  return {
    users: await fetchUsers() || [],
    orders: await fetchOrders() || [],
    menu: await fetchMenu() || [],
    verificationCode: verCode,
    username: ""
  }
}

export default async function Home() {
  const restaurant = cookies().get("restaurant")?.value || ""
  const verificationCode = cookies().get("verification_code")?.value || ""
  const username = cookies().get("username")?.value || ""
  const menuItems = await getAllMenuItems(restaurant) || []
  return (
    <ModalProvider>
      <Header code={verificationCode} username={username} />
      <Table menuItems={menuItems} verificationCode={verificationCode} />
    </ModalProvider>
  );
}
