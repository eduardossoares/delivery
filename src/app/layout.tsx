import { Metadata } from "next";
import { ReactNode } from "react";
import "@/app/globals.css";

import { AuthProvider } from "@/contexts/AuthContext";
import { Geist } from "next/font/google";

import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Anota Já - Faça seu Pedido!",
  description: "Peça seu Delivery já!",
};

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR" className={geistSans.className}>
      <body className="antialised">
          {children}
      </body>
    </html>
  );
}
