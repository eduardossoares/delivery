import { ReactNode } from "react";
import { Metadata } from "next";

import { Geist } from "next/font/google";

import { AuthProvider } from "../../../contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: "variable",
});

export const metadata: Metadata = {
  title: "Anota Já - Faça seu Login!",
  description: "Seu serviço de delivery!",
};

export default function LoginLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR" className={geistSans.className}>
      <body className="antialised">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
