import ConfirmationModal from "./ConfirmationModal";

interface RemoveItemModalProps {
  notifyMessage: string;
}

export default function RemoveItemModal({notifyMessage}: RemoveItemModalProps) {
  return (
    <ConfirmationModal
      notifyMessage={notifyMessage}
      confirmationMessage={`Você tem certeza que gostaria de apagar o item?`}
      buttonMessage="Apagar"
    />
  );
}
