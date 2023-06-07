import Table from "./table";

import { fetchMenu, fetchOrders, fetchUsers } from "../utils/fetch";
import { ModalProvider } from "../contexts/modal";
import { DataProvider } from "../contexts/data";
import { TokenProvider } from "../contexts/token";
import { getAllOrders } from "../actions";
import { cookies } from "next/headers";
import Header from "../header";

export default async function Home() {
  const restaurant = cookies().get("restaurant")?.value || ""
  const verificationCode = cookies().get("verification_code")?.value || ""
  const username = cookies().get("username")?.value || ""
  const orders = await getAllOrders(verificationCode) || []
  return (
    <ModalProvider>
      <Header code={verificationCode} username={username} />
      <Table orders={orders} verificationCode={verificationCode} />
    </ModalProvider>
  );
}
