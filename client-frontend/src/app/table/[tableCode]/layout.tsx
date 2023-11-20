import TableHeader from "@/components/Table/TableHeader";
import TableNavbar from "@/components/Table/TableNavbar";
import { ModalProvider } from "@/contexts/modal";
import TableProvider from "@/contexts/TableContext";
import Providers from "@/redux/providers";

// import "../../globals.css";

export default function RoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <Providers>
        <TableProvider>
          <ModalProvider>
            <TableHeader />
            {children}
            <TableNavbar />
          </ModalProvider>
        </TableProvider>
    </Providers>
  );
}