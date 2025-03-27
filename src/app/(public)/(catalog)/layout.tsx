import { ReactNode } from "react";
import { Metadata } from "next";

import { Geist } from "next/font/google";
import { Toaster } from "react-hot-toast";

import { ModalProvider } from "@/contexts/ModalContext";
import CartProvider from "@/contexts/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: "variable",
});

export const metadata: Metadata = {
  title: "Anota Já - Faça seu pedido!",
  description: "Seu serviço de delivery!",
};

export default function CatalogLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR" className={geistSans.className}>
      <body className="antialised">
        <CartProvider>
          <ModalProvider>
            {children}
            <Toaster />
          </ModalProvider>
        </CartProvider>
      </body>
    </html>
  );
}
