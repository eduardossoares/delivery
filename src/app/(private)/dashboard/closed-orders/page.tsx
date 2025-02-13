"use client";

import { useState } from "react";

import { useContext } from "react";
import { ModalContext } from "@/contexts/ModalContext";

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

import { BsThreeDots } from "react-icons/bs";
import OrderDetailModal from "@/components/OrderDetailModal";

export default function Page() {
  const { closeModal, openModal } = useContext(ModalContext);

  const [isOrderDetailModalOpen, setIsOrderDetailModalOpen] = useState(false);

  const openOrderDetailModal = () => {
    openModal();
    setIsOrderDetailModalOpen(true);
  };

  const closeOrderDetailModal = () => {
    closeModal();
    setIsOrderDetailModalOpen(false);
  };

  return (
    <div
      className="flex flex-col justify-center items-center w-full 
    py-12 gap-y-8 lg:justify-normal lg:text-center"
    >
      <h1 className="text-orangePrimary text-2xl font-bold">
        Pedidos Finalizados
      </h1>

      <div className="w-full px-4 lg:px-24 flex flex-col items-center justify-center gap-y-4">
        <div className="w-full">
          <Table>
            <TableCaption>
              Clique na linha para ver detalhes do pedido.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-start">Pedido</TableHead>
                <TableHead className="text-start">Data</TableHead>
                <TableHead className="text-start">Horário</TableHead>
                <TableHead className="text-start max-sm:hidden">
                  Cliente
                </TableHead>
                <TableHead className="text-start max-sm:hidden">
                  Total
                </TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow
                className="cursor-pointer"
                onClick={openOrderDetailModal}
              >
                <TableCell className="text-start">#1</TableCell>
                <TableCell className="text-start">10/02/25</TableCell>
                <TableCell className="text-start">19:10</TableCell>
                <TableCell className="text-start max-sm:hidden">
                  Eduardo
                </TableCell>
                <TableCell className="text-start max-sm:hidden">
                  R$79,99
                </TableCell>
                <TableCell className="flex items-center justify-end">
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
          isAOpenOrder={false}
          closeModalFunction={closeOrderDetailModal}
        />
      )}
    </div>
  );
}
