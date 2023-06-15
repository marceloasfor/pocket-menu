import { ModalProvider } from "../contexts/modal";
import { getAllMenuItems } from "../actions";
import { cookies } from "next/headers";
import Header from "../header";
import Menu from "./menu";
import Navigation from "../navigation";

export default async function Home() {
  const verificationCode = cookies().get("verification_code")?.value || "";
  const restaurant = cookies().get("restaurant")?.value || "";
  const token = cookies().get("token")?.value || "";
  const res = await getAllMenuItems(restaurant) || [];

  const { error } = res;
  if (error) {
    console.log(token);
    console.log(error);
    return null;
  }

  const menuItems = res;
  return (
    <ModalProvider>
      <Header code={verificationCode} token={token} />
      <div className='h-screen'>
        <div className='overflow-y-auto pb-20 pt-16 self-start'>
          <Menu menuItems={menuItems} token={token} />
        </div>
      </div>
      <Navigation />
    </ModalProvider>
  );
}
