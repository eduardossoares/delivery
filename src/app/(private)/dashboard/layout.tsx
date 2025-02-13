import { Metadata } from "next";
import { ReactNode } from "react";
import "@/app/globals.css";

import { AuthProvider } from "@/contexts/AuthContext";
import { ModalProvider } from "@/contexts/ModalContext";
import { Geist } from "next/font/google";

import Sidebar from "@/components/Sidebar";

import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Anota Já - Dashboard",
  description: "Gerencie seu catálogo online!",
};

export default function DashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR" className={geistSans.className}>
      <body className="antialised">
        <AuthProvider>
          <ModalProvider>
            <main className="flex flex-row">
              <Sidebar />
              {children}
              <Toaster />
            </main>
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
