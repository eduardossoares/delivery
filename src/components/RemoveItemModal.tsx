import ConfirmationModal from "./ConfirmationModal";
import { setupAPIClient } from "@/services/api";
import toast from "react-hot-toast";

interface RemoveItemModalProps {
  categoryId?: string;
  productId?: string;
  isCategory?: boolean;
  isProduct?: boolean;
}

export default function RemoveItemModal({
  categoryId,
  isCategory,
  isProduct,
  productId,
}: RemoveItemModalProps) {
  const api = setupAPIClient();

  const deleteItem = async () => {
    if (!!isCategory) {
      try {
        await api.delete(`/category/${categoryId}`);
        toast.success("Categoria removida com sucesso!");
      } catch (error) {
        console.log("Erro: " + error);
        toast.error("Erro ao remover categoria!");
      }
    }

    if(!!isProduct) {
      try {
        await api.delete(`/product/${productId}`);
        toast.success("Produto removido com sucesso!");
      } catch(error) {
        console.log(productId)
        console.log("Erro: " + error);
        toast.error("Erro ao remover produto!");
      }
    }
  };
  return (
    <ConfirmationModal
      buttonFunction={ deleteItem }
      confirmationMessage={`Você tem certeza que gostaria de apagar o item?`}
      buttonMessage="Apagar"
    />
  );
}
