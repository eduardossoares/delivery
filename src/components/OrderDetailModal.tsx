import Modal from "./Modal";
import Button from "./Button";

import { useContext } from "react";
import { ModalContext } from "@/contexts/ModalContext";

import ConfirmationModal from "./ConfirmationModal";

import { IoMdClose } from "react-icons/io";

interface OrderDetailModalProps {
  closeModalFunction: () => void;
  completeOrderFunction?: () => void;
  contactFunction?: () => void;
  isAOpenOrder?: boolean;
}

export default function OrderDetailModal({
  closeModalFunction,
  isAOpenOrder = true,
}: OrderDetailModalProps) {
  const { isConfirmationModalOpen, openConfirmationModal } =
    useContext(ModalContext);

  const showConfirmationModal = () => {
    openConfirmationModal();
  };

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
                    <span className="font-normal text-zinc-800">Eduardo</span>
                  </p>
                  <p className="font-bold">
                    Telefone:{" "}
                    <span className="font-normal text-zinc-800">
                      51958376531
                    </span>
                  </p>
                  <p className="font-bold">
                    Horário:{" "}
                    <span className="font-normal text-zinc-800">19:33</span>
                  </p>
                </div>

                <div>
                  <p className="font-bold">
                    Forma de Pagamento:{" "}
                    <span className="font-normal text-zinc-800">Pix</span>
                  </p>

                  <p className="font-bold">
                    Endereço:{" "}
                    <span className="font-normal text-zinc-800">
                      Rua São Leopoldo, 40
                    </span>
                  </p>
                </div>

                <p className="font-bold">
                  Nota:{" "}
                  <span className="font-normal text-zinc-800">Não possui.</span>
                </p>

                <p className="font-bold">
                  Total:{" "}
                  <span className="font-normal text-zinc-800">R$ 65,97</span>
                </p>
              </div>

              <div className="flex gap-x-2">
                <Button styles="h-10 bg-grayPrimary text-zinc-500 flex-1">
                  Contatar
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
          buttonMessage="Finalizar"
          confirmationMessage={`Você tem certeza que gostaria de finalizar o pedido?`}
        />
      )}

      {!isAOpenOrder && (
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
                    <span className="font-normal text-zinc-800">Eduardo</span>
                  </p>
                  <p className="font-bold">
                    Telefone:{" "}
                    <span className="font-normal text-zinc-800">
                      51958376531
                    </span>
                  </p>
                  <p className="font-bold">
                    Horário:{" "}
                    <span className="font-normal text-zinc-800">19:33</span>
                  </p>
                </div>

                <div>
                  <p className="font-bold">
                    Forma de Pagamento:{" "}
                    <span className="font-normal text-zinc-800">Pix</span>
                  </p>

                  <p className="font-bold">
                    Endereço:{" "}
                    <span className="font-normal text-zinc-800">
                      Rua São Leopoldo, 40
                    </span>
                  </p>
                </div>

                <p className="font-bold">
                  Nota:{" "}
                  <span className="font-normal text-zinc-800">Não possui.</span>
                </p>

                <p className="font-bold">
                  Total:{" "}
                  <span className="font-normal text-zinc-800">R$ 65,97</span>
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
