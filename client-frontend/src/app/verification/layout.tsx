import UserProvider from "@/contexts/UserContext";
import "../globals.css";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Restaurant",
  description: "Restaurant Homepage",
  icons: "/images/logo.png"
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
}