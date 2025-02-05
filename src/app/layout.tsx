import { Metadata } from "next";
import { ReactNode } from "react";
import "@/app/globals.css";

import { AuthProvider } from "@/contexts/AuthContext";
import { Geist } from "next/font/google";

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
      <body className="antialiaseded">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
