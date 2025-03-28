"use client";

import { useEffect, useState } from "react";

import { useContext } from "react";
import { ModalContext } from "@/contexts/ModalContext";

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

import { setupAPIClient } from "@/services/api";

import { Order } from "@/types/order";

export default function Page() {
  const { closeModal, openModal } = useContext(ModalContext);

  const [isOrderDetailModalOpen, setIsOrderDetailModalOpen] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderId, setOrderId] = useState("");

  const api = setupAPIClient();

  let orderNumber = 1;

  useEffect(() => {
    const getOrders = async () => {
      await api
        .get("/order")
        .then((response) => setOrders(response.data))
        .catch((error) => console.log(error));
    };

    getOrders(); // Fetch orders immediately on mount

    const intervalId = setInterval(getOrders, 10000); // Fetch orders every 10 seconds

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  const openOrderDetail = () => {
    openModal();
    setIsOrderDetailModalOpen(true);
  };

  const closeOrderDetail = () => {
    closeModal();
    setTimeout(() => setIsOrderDetailModalOpen(false), 400);
  };

  const formatDate = (dateToFormat: string) => {
    const date = new Date(dateToFormat);
    const brazilTime = new Date(date.setHours(date.getUTCHours() - 3));
    const formatted = brazilTime.toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return formatted;
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
                <TableHead className="text-start">Total</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map(
                (order) =>
                  order.draft === false &&
                  order.status === false && (
                    <TableRow
                      key={order.id}
                      className="cursor-pointer"
                      onClick={() => {
                        openOrderDetail();
                        setOrderId(order.id);
                      }}
                    >
                      <TableCell className="text-start">
                        #{orderNumber++}
                      </TableCell>
                      <TableCell className="text-start">
                        {formatDate(order.created_at)}
                      </TableCell>
                      <TableCell className="text-start max-sm:hidden">
                        {order.name}
                      </TableCell>
                      <TableCell className="text-start">R$79,99</TableCell>
                      <TableCell className="flex items-center justify-end gap-x-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <BsThreeDots
                                className="text-orangePrimary"
                                size={20}
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Ver Pedido</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                    </TableRow>
                  )
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {isOrderDetailModalOpen && (
        <OrderDetailModal
          isAOpenOrder={true}
          orderId={orderId}
          closeModalFunction={closeOrderDetail}
        />
      )}
    </div>
  );
}
