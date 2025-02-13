"use client";

import { useContext } from "react";
import { ModalContext } from "@/contexts/ModalContext";

import { ReactNode } from "react";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";

interface ModalProps extends HTMLMotionProps<"div"> {
  styles?: string;
  children: ReactNode;
}

export default function Modal({ styles, children, ...rest }: ModalProps) {
  const { isModalOpened } = useContext(ModalContext);

  return (
    <AnimatePresence>
      {isModalOpened && (
        <motion.div
          key={"bg"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className="absolute left-0 top-0 w-full z-50 h-screen flex bg-black bg-opacity-40 items-center justify-center px-4 sm:px-0"
        >
          <motion.div
            key={"modal"}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className={`bg-white w-full sm:w-[546px] rounded-md relative ${styles}`}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
