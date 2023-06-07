import Table from "./table";

import { fetchMenu, fetchOrders, fetchUsers } from "../utils/fetch";
import { ModalProvider } from "../contexts/modal";
import { DataProvider } from "../contexts/data";
import { TokenProvider } from "../contexts/token";
import { getAllMenuItems } from "../actions";
import { cookies } from "next/headers";


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
  const restaurant = cookies().get("restaurant")
  const verificationCode = cookies().get("verification_code")
  const username = cookies().get("username")
  const menuItems = await getAllMenuItems(restaurant?.value || "") || []
  return (
    <ModalProvider>
      <Table menuItems={menuItems} verificationCode={verificationCode?.value || ""} />
    </ModalProvider>
  );
}
