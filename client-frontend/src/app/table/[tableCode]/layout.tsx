import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

import LogoutModal from "@/components/modals/LogoutModal";
import Navbar from "@/components/Table/navbar/Navbar";
import TableHeader from "@/components/Table/TableHeader";
import TableNavbar from "@/components/Table/TableNavbar";
import { ModalProvider } from "@/contexts/modal";
import TableProvider from "@/contexts/TableContext";
import Providers from "@/redux/providers";

// import "../../globals.css";

export default async function TableLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user;
  const restaurant = session?.restaurant_name;

  return (
    <Providers>
        <TableProvider>
          <ModalProvider>
            {/* <TableHeader /> */}
            <LogoutModal currentUser={currentUser} />
            <Navbar currentUser={currentUser} restaurant={restaurant} />
            <div className="pb-20 pt-28">
              {children}
            </div>
            <TableNavbar />
          </ModalProvider>
        </TableProvider>
    </Providers>
  );
}