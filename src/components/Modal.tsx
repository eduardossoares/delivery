"use client";

import { useContext } from "react";
import { ModalContext } from "@/contexts/ModalContext";

import { ReactNode } from "react";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import { CartContext } from "@/contexts/CartContext";

interface ModalProps extends HTMLMotionProps<"div"> {
  styles?: string;
  children: ReactNode;
  isCartModal?: boolean;
}

export default function Modal({ styles, children, isCartModal }: ModalProps) {
  const { isModalOpened } = useContext(ModalContext);
  const { cartItems } = useContext(CartContext);

  return (
    <AnimatePresence>
      {isModalOpened && (
        <motion.div
          key={"bg"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className=" absolute left-0 top-0 w-full z-50 h-screen flex bg-black bg-opacity-40 items-center justify-center px-4 sm:px-0"
        >
          <motion.div
            key={"modal"}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className={`bg-white w-full sm:w-[546px] rounded-md relative ${styles} ${
              isCartModal && "lg:w-[1336px] lg:mx-4 overflow-y-auto"
            } ${cartItems.length === 0 ? "lg:w-[546px]" : "lg:h-[90%] h-[80%]"}`}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
