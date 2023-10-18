import UserProvider from "@/contexts/UserContext";
import "./globals.css";
import localFont from "next/font/local";
import { Metadata } from "next";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";

const calibre = localFont({
  src: [
    { path: "../../public/fonts/CalibreRegular.otf", weight: "normal" },
    { path: "../../public/fonts/CalibreMedium.otf", weight: "500" },
    { path: "../../public/fonts/CalibreLight.otf", weight: "300" },
    { path: "../../public/fonts/CalibreSemibold.otf", weight: "600" },
    { path: "../../public/fonts/CalibreBold.otf", weight: "bold" },
  ],
});

export const metadata: Metadata = {
  title: "Restaurant",
  description: "Restaurant Homepage",
  icons: "/images/logo.png"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={calibre.className}>
          {children}
          <ToastContainer />
        </body>
      </UserProvider>
    </html>
  );
}