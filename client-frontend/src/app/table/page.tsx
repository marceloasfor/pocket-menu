import Table from "./table";

import { fetchMenu, fetchOrders, fetchUsers } from "../utils/fetch";
import { ModalProvider } from "../contexts/modal";
import { DataProvider } from "../contexts/data";
import { TokenProvider } from "../contexts/token";


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
  return (
    <TokenProvider>
      <DataProvider>
        <ModalProvider>
          <Table />
        </ModalProvider>
      </DataProvider>
    </TokenProvider>
  );
}
