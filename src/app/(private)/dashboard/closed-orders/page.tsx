"use client";

import { useEffect, useState } from "react";

import { useContext } from "react";
import { ModalContext } from "@/contexts/ModalContext";
import { setupAPIClient } from "@/services/api";

import { Order } from "../page";

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
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderId, setOrderId] = useState("");

  const api = setupAPIClient();

  const openOrderDetailModal = () => {
    openModal();
    setIsOrderDetailModalOpen(true);
  };

  const closeOrderDetailModal = () => {
    closeModal();
    setIsOrderDetailModalOpen(false);
  };

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

  const formatDate = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  const formatHour = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  let orderCount = 1;

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
            <TableCaption>Clique no pedido para ver os detalhes.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-start">Pedido</TableHead>
                <TableHead className="text-start">Data</TableHead>
                <TableHead className="text-start">Horário</TableHead>
                <TableHead className="text-start max-sm:hidden">
                  Cliente
                </TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map(
                (order) =>
                  order.draft === false &&
                  order.status === true && (
                    <TableRow
                      key={order.id}
                      className="cursor-pointer"
                      onClick={() => {
                        openOrderDetailModal();
                        setOrderId(order.id);
                      }}
                    >
                      <TableCell className="text-start">
                        #{orderCount++}
                      </TableCell>
                      <TableCell className="text-start">
                        {formatDate(order.created_at)}
                      </TableCell>
                      <TableCell className="text-start">
                        {formatHour(order.created_at)}
                      </TableCell>
                      <TableCell className="text-start max-sm:hidden">
                        {order.name}
                      </TableCell>
                      <TableCell className="flex items-center justify-end">
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
          isAClosedOrder={true}
          orderId={orderId}
          closeModalFunction={closeOrderDetailModal}
        />
      )}
    </div>
  );
}
