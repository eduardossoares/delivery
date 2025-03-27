"use client";

import Link from "next/link";

import Modal from "./Modal";
import Button from "./Button";

import { useContext, useEffect, useState } from "react";
import { ModalContext } from "@/contexts/ModalContext";

import ConfirmationModal from "./ConfirmationModal";

import { IoMdClose } from "react-icons/io";
import { FaCaretRight } from "react-icons/fa";

import { setupAPIClient } from "@/services/api";

import { OrderDetail } from "@/types/order";

interface OrderDetailModalProps {
  orderId?: string;
  closeModalFunction: () => void;
  completeOrderFunction?: () => void;
  contactFunction?: () => void;
  isAOpenOrder?: boolean;
  isAClosedOrder?: boolean;
}

export default function OrderDetailModal({
  orderId,
  closeModalFunction,
  isAOpenOrder,
  isAClosedOrder,
}: OrderDetailModalProps) {
  const [openOrderDetail, setOpenOrderDetail] = useState<OrderDetail[]>([]);

  const { isConfirmationModalOpen, openConfirmationModal } =
    useContext(ModalContext);

  const showConfirmationModal = () => {
    openConfirmationModal();
  };

  const api = setupAPIClient();

  useEffect(() => {
    const getOrderDetail = async () => {
      try {
        const response = await api.get(`order/${orderId}`);
        setOpenOrderDetail(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrderDetail();
  }, [orderId]);

  const formatDate = (dateToFormat: string) => {
    const date = new Date(dateToFormat);
    const dayMonthYear = date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return dayMonthYear;
  };

  const formatTime = (timeToFormat: string) => {
    const date = new Date(timeToFormat);
    const hourMinute = date.toLocaleString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return hourMinute;
  };

  const getTotalValue = () => {
    const totalPrices: number[] = [];
    let totalValue = 0;
    for (let i = 0; i < openOrderDetail.length; i++) {
      let amount = 0;
      let value = 0;
      amount = openOrderDetail[i]?.amount;
      value = parseFloat(openOrderDetail[i]?.product?.price);
      totalPrices.push(value * amount);
    }

    for (let i = 0; i < totalPrices.length; i++) {
      totalValue += totalPrices[i];
    }

    return totalValue;
  };

  const total = getTotalValue();

  return (
    <div>
      {!isConfirmationModalOpen && isAOpenOrder && (
        <Modal>
          <div className="py-8 sm:py-4 px-8 sm:px-4">
            <IoMdClose
              onClick={closeModalFunction}
              className="absolute right-2 top-2 text-2xl cursor-pointer text-orangePrimary 
          "
            />
            <h1 className="text-orangePrimary text-2xl font-bold">
              Detalhes do Pedido
            </h1>
            <div className="flex flex-col text-start gap-y-4">
              <div className="space-y-4">
                <div>
                  <p className="font-bold">
                    Nome:{" "}
                    <span className="font-normal text-zinc-800">
                      {openOrderDetail[0]?.order?.name}.
                    </span>
                  </p>
                  <p className="font-bold">
                    Telefone:{" "}
                    <Link
                      href={`https://wa.me/${openOrderDetail[0]?.order?.phone}`}
                      className="font-normal text-zinc-800"
                    >
                      {openOrderDetail[0]?.order?.phone}
                    </Link>
                  </p>
                </div>

                <div>
                  <p className="font-bold">
                    Data:{" "}
                    <span className="font-normal text-zinc-800">
                      {formatDate(openOrderDetail[0]?.order?.created_at)}
                    </span>
                  </p>
                  <p className="font-bold">
                    Horário:{" "}
                    <span className="font-normal text-zinc-800">
                      {formatTime(openOrderDetail[0]?.order?.created_at)}
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <p className="font-bold">
                  Endereço:{" "}
                  <span className="font-normal text-zinc-800">
                    {openOrderDetail[0]?.order?.street_adress}
                    {", "}
                    {openOrderDetail[0]?.order?.number_adress}.
                  </span>
                </p>

                {openOrderDetail[0]?.order?.reference_adress && (
                  <p className="font-bold">
                    Referência:{" "}
                    <span className="font-normal">
                      {openOrderDetail[0]?.order?.reference_adress}.
                    </span>
                  </p>
                )}
              </div>

              <div className="bg-graySecondary p-2 rounded border-1 border-grayPrimary space-y-4">
                <div className="space-y-1">
                  <h2 className="text-orangePrimary font-bold text-lg">
                    Pedido
                  </h2>
                  <ul className="space-y-2.5">
                    {openOrderDetail.map((item) => (
                      <li key={item?.id}>
                        <div className="flex flex-row items-center">
                          <FaCaretRight className="text-orangePrimary" />
                          <p className="text-sm flex flex-row items-center gap-x-2">
                            {item?.product?.name} ({item?.amount})
                            <p>- R${parseFloat(item?.product?.price)}</p>
                          </p>
                        </div>
                        <p className="text-xs text-zinc-600">
                          {item?.product?.description}.
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
                {openOrderDetail[0]?.order?.note && (
                  <p className="font-semibold text-orangePrimary">
                    Anotações:{" "}
                    <span className="font-normal text-zinc-800">
                      {openOrderDetail[0]?.order?.note}.
                    </span>
                  </p>
                )}
              </div>

              <div>
                <p className="font-bold">
                  Forma de Pagamento:{" "}
                  <span className="font-normal text-zinc-800">
                    {openOrderDetail[0]?.order?.payment_type}.
                  </span>
                </p>
                <p className="font-bold">
                  Total:{" "}
                  <span className="font-normal text-zinc-800">
                    {total.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </p>
              </div>

              <div className="flex gap-x-2">
                <Button
                  styles="h-10 bg-grayPrimary text-zinc-500 flex-1"
                  onClick={closeModalFunction}
                >
                  Voltar
                </Button>
                <Button
                  styles="h-10 bg-orangePrimary text-white flex-1"
                  onClick={showConfirmationModal}
                >
                  Finalizar
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
      
      {isConfirmationModalOpen && (
        <ConfirmationModal
          isACloseOrder={true}
          orderId={orderId}
          buttonMessage="Finalizar"
          confirmationMessage={`Você tem certeza que gostaria de finalizar o pedido?`}
        />
      )}
      
      {!isConfirmationModalOpen && isAClosedOrder && (
        <Modal>
          <div className="py-8 sm:py-4 px-8 sm:px-4">
            <IoMdClose
              onClick={closeModalFunction}
              className="absolute right-2 top-2 text-2xl cursor-pointer text-orangePrimary 
        "
            />
            <h1 className="text-orangePrimary text-2xl font-bold">
              Detalhes do Pedido
            </h1>
            <div className="flex flex-col text-start gap-y-4">
              <div className="space-y-4">
                <div>
                  <p className="font-bold">
                    Nome:{" "}
                    <span className="font-normal text-zinc-800">
                      {openOrderDetail[0]?.order?.name}
                    </span>
                  </p>
                  <p className="font-bold">
                    Telefone:{" "}
                    <span className="font-normal text-zinc-800">
                      {openOrderDetail[0]?.order?.phone}
                    </span>
                  </p>
                  <p className="font-bold">
                    Horário:{" "}
                    <span className="font-normal text-zinc-800">
                      {formatTime(openOrderDetail[0]?.order?.created_at)}
                    </span>
                  </p>
                </div>

                <div>
                  <p className="font-bold">
                    Forma de Pagamento:{" "}
                    <span className="font-normal text-zinc-800">
                      {openOrderDetail[0]?.order?.payment_type}.
                    </span>
                  </p>

                  <p className="font-bold">
                    Endereço:{" "}
                    <span className="font-normal text-zinc-800">
                      {openOrderDetail[0]?.order?.street_adress},{" "}
                      {openOrderDetail[0]?.order?.number_adress}.
                    </span>
                  </p>
                </div>

                {openOrderDetail[0]?.order?.reference_adress && (
                  <p className="font-bold">
                    Nota:{" "}
                    <span className="font-normal text-zinc-800">
                      {openOrderDetail[0]?.order?.note}.
                    </span>
                  </p>
                )}

                <p className="font-bold">
                  Total:{" "}
                  <span className="font-normal text-zinc-800">
                    {total.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
