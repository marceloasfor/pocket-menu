import Table from "./table";

import { fetchMenu, fetchOrders, fetchUsers } from "../utils/fetch";
import { ModalProvider } from "../contexts/modal";
import { DataProvider } from "../contexts/data";
import { TokenProvider } from "../contexts/token";
import { getAllOrders } from "../actions";
import { cookies } from "next/headers";

export default async function Home() {
  const restaurant = cookies().get("restaurant")
  const verificationCode = cookies().get("verification_code")
  const username = cookies().get("username")
  const orders = await getAllOrders(verificationCode?.value || "") || []
  return (
    <ModalProvider>
      <Table orders={orders} verificationCode={verificationCode?.value || ""} />
    </ModalProvider>
  );
}
