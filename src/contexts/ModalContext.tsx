"use client";

import { createContext, ReactNode, useState } from "react";

type ModalContextData = {
  isModalOpened: boolean;
  openModal: () => void;
  closeModal: () => void;
  isConfirmationModalOpen: boolean;
  openConfirmationModal: () => void;
  isRemoveItemModalOpen: boolean;
  openRemoveItemModal: () => void;
  isCartModalOpen: boolean;
  openCartModal: () => void;
};

const ModalContext = createContext({} as ModalContextData);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isConfirmationModalOpen, setIsConfimationModalOpen] = useState(false);
  const [isRemoveItemModalOpen, setIsRemoveItemModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpened(false);
    setIsConfimationModalOpen(false);
    setIsRemoveItemModalOpen(false);
    setIsCartModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpened(true);
  };

  const openConfirmationModal = () => {
    setIsConfimationModalOpen(true);
  };

  const openRemoveItemModal = () => {
    setIsRemoveItemModalOpen(true);
  };

  const openCartModal = () => {
    setIsCartModalOpen(true);
    console.log(isCartModalOpen);
  };

  return (
    <ModalContext.Provider
      value={{
        closeModal,
        openModal,
        isModalOpened,
        isConfirmationModalOpen,
        openConfirmationModal,
        isRemoveItemModalOpen,
        openRemoveItemModal,
        isCartModalOpen,
        openCartModal
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export { ModalContext };
