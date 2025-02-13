"use client";
import { useState } from "react";

import { useContext } from "react";
import { ModalContext } from "@/contexts/ModalContext";

import { IoIosArrowForward } from "react-icons/io";
import { FaClock } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

import OrderDetailModal from "@/components/OrderDetailModal";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ConfirmationModal from "@/components/ConfirmationModal";

export default function Page() {
  const { closeModal, openModal } = useContext(ModalContext);

  const [isOrderDetailModalOpen, setIsOrderDetailModalOpen] = useState(true);

  const openOrderDetail = () => {
    openModal();
    setIsOrderDetailModalOpen(true);
  };

  const closeOrderDetail = () => {
    closeModal();
    setTimeout(() => setIsOrderDetailModalOpen(false), 400);
  };

  return (
    <div
      className="flex flex-col justify-center items-center w-full 
    py-12 gap-y-8 lg:justify-normal lg:text-center"
    >
      <h1 className="text-orangePrimary text-2xl font-bold">
        Pedidos Pendentes
      </h1>

      <div className="w-full px-4 lg:px-24 flex flex-col items-center justify-center gap-y-4">
        <div
          className="w-full bg-orangePrimary rounded-md p-4 flex-row justify-between
          gap-y-8 items-center hidden
          text-white"
        >
          <p className="font-semibold">Pedido #1</p>
          <div className="flex items-center gap-x-8">
            <div className="flex items-center gap-x-1">
              <FaClock size={18} />
              <p className="font-bold">19:33</p>
            </div>
            <IoIosArrowForward size={28} />
          </div>
        </div>

        <div className="w-full">
          <Table>
            <TableCaption>
              Clique na linha para ver detalhes do pedido.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-start">Pedido</TableHead>
                <TableHead className="text-start">Horário</TableHead>
                <TableHead className="text-start max-sm:hidden">
                  Cliente
                </TableHead>
                <TableHead className="text-start max-sm:hidden">
                  Itens
                </TableHead>
                <TableHead className="text-start">Total</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="cursor-pointer" onClick={openOrderDetail}>
                <TableCell className="text-start">#1</TableCell>
                <TableCell className="text-start">19:33</TableCell>
                <TableCell className="text-start max-sm:hidden">
                  Eduardo
                </TableCell>
                <TableCell className="text-start max-sm:hidden">4</TableCell>
                <TableCell className="text-start">R$79,99</TableCell>
                <TableCell className="flex items-center justify-end gap-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <BsThreeDots className="text-orangePrimary" size={20} />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Ver Pedido</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      {isOrderDetailModalOpen && (
        <OrderDetailModal
          closeModalFunction={closeOrderDetail}
        />
      )}
    </div>
  );
}
