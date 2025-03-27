import React, { useContext } from "react";
import logo from "@/../public/logo.svg";
import { PiShoppingCartBold } from "react-icons/pi";
import Image from "next/image";
import { CartContext } from "@/contexts/CartContext";
import { ModalContext } from "@/contexts/ModalContext";

export default function Header() {
  const { cartItems } = useContext(CartContext);
  const { openCartModal, openModal } = useContext(ModalContext);

  const handleOpenCartModal = () => {
    openModal();
    openCartModal();
  };

  return (
    <header className="flex flex-row justify-between items-center py-4">
      <Image className="cursor-pointer" src={logo} width={46} alt="Logo" />
      <div className="relative cursor-pointer" onClick={handleOpenCartModal}>
        <PiShoppingCartBold
          size={28}
          className="text-orangePrimary cursor-pointer"
        />
        {cartItems.length > 0 && (
          <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
            <span>{cartItems.length}</span>
          </div>
        )}
      </div>
    </header>
  );
}
