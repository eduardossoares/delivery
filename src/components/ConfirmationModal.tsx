import { useContext } from "react";
import { ModalContext } from "@/contexts/ModalContext";

import toast from "react-hot-toast";

import Button from "./Button";
import Modal from "./Modal";

interface ConfirmationModalProps {
  confirmationMessage: string;
  buttonMessage: string;
  notifyMessage?: string;
}

export default function ConfirmationModal({
  confirmationMessage,
  buttonMessage,
  notifyMessage,
}: ConfirmationModalProps) {
  const { closeModal } = useContext(ModalContext);

  const notify = () =>
    toast(
      !!notifyMessage ? notifyMessage : "✔️ Pedido finalizado com sucesso!"
    );

  const confirmModal = () => {
    closeModal();
    notify();
  };

  return (
    <Modal>
      <div className="py-8 sm:py-10 px-4 sm:px-4 text-center space-y-3 sm:w-96 flex justify-center flex-col mx-auto">
        <h1 className="text-zinc-500 font-bold text-xl">
          {confirmationMessage}
        </h1>
        <div className="flex flex-row items-center gap-x-2">
          <Button
            styles="text-zinc-500 h-10 bg-grayPrimary px-4 flex-1"
            onClick={closeModal}
          >
            Cancelar
          </Button>
          <Button
            styles="text-white h-10 bg-orangePrimary px-4 flex-1"
            onClick={confirmModal}
          >
            {buttonMessage}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
